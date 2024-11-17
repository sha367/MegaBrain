// Copyright (c) 2023-2023, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_IO_WKBREADER_H_
#define SFCGAL_IO_WKBREADER_H_

#include <sstream>

#include "SFCGAL/config.h"

#include "SFCGAL/Geometry.h"
#include "SFCGAL/GeometryCollection.h"
#include "SFCGAL/LineString.h"
#include "SFCGAL/MultiLineString.h"
#include "SFCGAL/MultiPoint.h"
#include "SFCGAL/MultiPolygon.h"
#include "SFCGAL/Point.h"
#include "SFCGAL/Polygon.h"
#include "SFCGAL/PolyhedralSurface.h"
#include "SFCGAL/PreparedGeometry.h"
#include "SFCGAL/Triangle.h"
#include "SFCGAL/TriangulatedSurface.h"

#include "SFCGAL/detail/tools/InputStreamReader.h"

#include <boost/endian/conversion.hpp> // don't use bit, since it requires c++20

//
namespace SFCGAL::detail::io {

/**
 * read WKB geometry
 *
 */
class SFCGAL_API WkbReader {
public:
  /**
   * read WKB from input stream
   * @param wkbString hexadecimal ascii string or binary string
   * @param asHexString if false, will read the wkb as binary string, else will
   * read the string as hex ascii string (ie. 2 chars for 1 byte with values
   * matching [0-9A-F]
   */
  WkbReader(std::istream &wkbString, bool asHexString = false)
      : _reader(wkbString), _asHexString(asHexString)
  {
  }

  auto
  readWkb() -> void
  {
    // wkbOrder
    std::byte wkbOrder{read<std::byte>()};
    _swapEndian =
        boost::endian::order::native == boost::endian::order(wkbOrder);

    _geometry = readGeometry();
  }

  /**
   * Returns the geometry from the (E)WKB
   *
   * Must be used after readWkb
   */
  auto
  geometry() -> std::unique_ptr<SFCGAL::Geometry>
  {
    return std::move(_geometry);
  }

  /**
   * Returns the prepared geometry from the (E)WKB
   *
   * Must be used after readWkb
   */
  auto
  preparedGeometry() -> std::unique_ptr<SFCGAL::PreparedGeometry>
  {
    return std::make_unique<SFCGAL::PreparedGeometry>(std::move(_geometry),
                                                      _srid);
  }

  /**
   * Returns the srid from the (E)WKB
   *
   * Must be used after readWkb
   */
  [[nodiscard]] auto
  srid() const -> srid_t
  {
    return _srid;
  }

private:
  /**
   * Convenient templated method to read bytes from _wkbData
   */
  template <typename T>
  auto
  read() -> T
  {
    const size_t sizeType = sizeof(T);
    union {
      std::array<std::byte, sizeType> byteArray;
      T                               d;
    };

    if (_asHexString) {
      const size_t nbElements       = 2;
      const size_t totalBytesToRead = nbElements * sizeType;
      std::string  buffer(totalBytesToRead, '\0');
      _reader.readBytes(buffer, totalBytesToRead);
      const int base = 16;

      for (size_t i = 0; i < sizeType; i++) {
        size_t      chunkPos = nbElements * i;
        std::string byteStr  = buffer.substr(chunkPos, nbElements);
        byteArray[i] =
            static_cast<std::byte>(std::stoi(byteStr, nullptr, base));
      }

      _index += sizeType * nbElements;
    } else {
      std::string buffer(sizeType, '\0');
      _reader.readBytes(buffer, sizeType);
      std::transform(buffer.begin(), buffer.end(), byteArray.begin(),
                     [](char c) { return std::byte(c); });

      _index += sizeType;
    }

    return d;
  }

  /**
   *
   */
  auto
  readGeometry() -> std::unique_ptr<SFCGAL::Geometry>
  {
    GeometryType geometryType = readGeometryType();
    return readGeometryData(geometryType);
  }

  /**
   *
   * Read the geometry type from (E)WKB and transform it
   * to SFCGAL one.
   *
   */
  auto
  readGeometryType() -> GeometryType
  {
    auto geometryType = read<uint32_t>();

    if (_isEWKB || ((geometryType & wkbSRID) == wkbSRID)) {
      if (!_isEWKB) {
        readSRID();
        _isEWKB = true;
      }

      if ((geometryType & wkbZ) == wkbZ) {
        _is3D = true;
      }
      if ((geometryType & wkbM) == wkbM) {
        _isMeasured = true;
      }
      geometryType &= 0x0FFFFFFF;
    } else {
      if (geometryType >= COORDINATE_XYZM) {
        _is3D       = true;
        _isMeasured = true;
        geometryType -= COORDINATE_XYZM;
      } else if (geometryType >= COORDINATE_XYM) {
        _is3D       = false;
        _isMeasured = true;
        geometryType -= COORDINATE_XYM;
      } else if (geometryType >= COORDINATE_XYZ) {
        _is3D       = true;
        _isMeasured = false;
        geometryType -= COORDINATE_XYZ;
      }
    }
    return static_cast<GeometryType>(geometryType);
  }

  /**
   * Main methods to dispatch reading methods according to the geometry type
   */
  auto
  readGeometryData(GeometryType geometryType) -> std::unique_ptr<Geometry>
  {
    switch (geometryType) {
    case TYPE_POINT:
      return std::unique_ptr<SFCGAL::Geometry>{readInnerPoint().clone()};

    case TYPE_LINESTRING:
      return std::unique_ptr<SFCGAL::Geometry>(readInnerLineString().clone());

    case TYPE_POLYGON:
      return std::unique_ptr<SFCGAL::Geometry>(readInnerPolygon().clone());

    case TYPE_GEOMETRYCOLLECTION:
      return std::unique_ptr<SFCGAL::Geometry>(
          readInnerGeometryCollection().clone());

    case TYPE_MULTIPOINT:
      return std::unique_ptr<SFCGAL::Geometry>(
          readInnerMultiGeometries<MultiPoint, Point>().clone());

    case TYPE_MULTILINESTRING:
      return std::unique_ptr<SFCGAL::Geometry>(
          readInnerMultiGeometries<MultiLineString, LineString>().clone());

    case TYPE_MULTIPOLYGON:
      return std::unique_ptr<SFCGAL::Geometry>(
          readInnerMultiGeometries<MultiPolygon, Polygon>().clone());

    case TYPE_TRIANGLE:
      return std::unique_ptr<SFCGAL::Geometry>(readInnerTriangle().clone());

    case TYPE_TRIANGULATEDSURFACE:
      return std::unique_ptr<SFCGAL::Geometry>(
          readInnerTriangulatedSurface().clone());

    case TYPE_POLYHEDRALSURFACE:
      return std::unique_ptr<SFCGAL::Geometry>(
          readInnerPolyhedralSurface().clone());

    default:
      std::ostringstream oss;
      oss << "WkbWriter: type '" << geometryType << "' is not supported";
      std::cerr << oss.str() << std::endl;

      return {};
    }
  }

  /**
   * Read an SRID, if present
   */
  auto
  readSRID() -> void
  {
    _srid = read<uint32_t>();
  }

  /**
   * Read Point content from wkb
   */
  auto
  readInnerPoint() -> Point;

  /**
   * Read LineString content from wkb
   */
  auto
  readInnerLineString() -> LineString;

  /**
   * Read Polygon content from wkb
   */
  auto
  readInnerPolygon() -> Polygon;

  /**
   * Read MultiGeometries (MultiPoint, MultiLineString, MultiPolygon content
   * from Wkb
   */
  template <typename M, typename G>
  auto
  readInnerMultiGeometries() -> M;

  /**
   * Read Triangle content from wkb
   */
  auto
  readInnerTriangle() -> Triangle;

  /**
   * Read GeometryCollection content from wkb
   */
  auto
  readInnerGeometryCollection() -> GeometryCollection;

  /**
   * Read TriangulatedSurface content from wkb
   */
  auto
  readInnerTriangulatedSurface() -> TriangulatedSurface;

  /**
   * Read PolyhedralSurface content from wkb
   */
  auto
  readInnerPolyhedralSurface() -> PolyhedralSurface;

  /**
   * actually reading 3D ?
   */
  bool _is3D = false;
  /**
   * actually reading Measured ?
   */
  bool _isMeasured = false;

  /**
   * wkb data
   */
  tools::InputStreamReader _reader;

  /**
   * if false, will read the wkb as binary string, else will read the string as
   * hex ascii string (ie. 2 chars for 1 byte with values matching [0-9A-F]
   */
  bool _asHexString;

  /**
   * is needed to swap bytes
   */
  bool _swapEndian = false;

  /**
   * sentinel parsing the _wkbData
   */
  std::streamoff _index = 0;

  /**
   * SRID value from EWKB
   */
  srid_t _srid = 0;

  /**
   * flag if the _wkbData is an EWKB or simple WKB
   */
  bool _isEWKB = false;
  /**
   * The geometry from the WKB
   */
  std::unique_ptr<SFCGAL::Geometry> _geometry;
};

} // namespace SFCGAL::detail::io

#endif
