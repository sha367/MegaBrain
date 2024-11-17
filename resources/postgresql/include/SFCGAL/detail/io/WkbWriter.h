// Copyright (c) 2023-2023, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_IO_WKBWRITER_H_
#define SFCGAL_IO_WKBWRITER_H_

#include <boost/endian/conversion.hpp>
#include <cstddef>
#include <iomanip>
#include <iostream>
#include <vector>

#include "SFCGAL/Geometry.h"
#include "SFCGAL/config.h"

using srid_t = uint32_t;

namespace SFCGAL::detail::io {

/**
 * Writer for WKB
 *
 */
class SFCGAL_API WkbWriter {
public:
  WkbWriter(std::ostream &s, bool asHexString = false)
      : _s(s), _asHexString(asHexString){};

  /**
   * write WKB for a geometry
   * wkbOrder is the native endianness by default.
   */
  void
  write(const Geometry      &g,
        boost::endian::order wkbOrder = boost::endian::order::native);

  /**
   * write EWKB for a geometry
   * wkbOrder is the native endianness by default.
   */
  void
  write(const Geometry &g, const srid_t &srid,
        boost::endian::order wkbOrder = boost::endian::order::native);

private:
  /**
   * Dedicated method to write the geometry type into _wkb data
   */
  void
  writeGeometryType(const Geometry &g, boost::endian::order wkbOrder =
                                           boost::endian::order::native);

  /**
   * Dedicated method to write Point into _wkb data
   */
  void
  writeInner(const Point         &g,
             boost::endian::order wkbOrder = boost::endian::order::native);

  /**
   * Dedicated method to write LineString into _wkb data
   */
  void
  writeInner(const LineString    &g,
             boost::endian::order wkbOrder = boost::endian::order::native);
  /**
   * Dedicated method to write Ring into _wkb data
   *
   * This method is shared by LineString and Polygon.
   */
  void
  writeInnerRing(const LineString    &g,
                 boost::endian::order wkbOrder = boost::endian::order::native);

  /**
   * Dedicated method to write Polygon into _wkb data
   */
  void
  writeInner(const Polygon       &g,
             boost::endian::order wkbOrder = boost::endian::order::native);

  /**
   * Dedicated method to write GeometryCollection into _wkb data
   */
  void
  writeInner(const GeometryCollection &g,
             boost::endian::order      wkbOrder = boost::endian::order::native);

  /**
   * Dedicated method to write Multi Geometries into _wkb data
   * Multi Geometries are: MultiPoint, MultiLineString, MultiPolygon,
   * PolyhedralSurface and TriangulatedSurface.
   */
  template <typename M, typename G>
  void
  writeInner(const M &g, boost::endian::order wkbOrder);

  /**
   * Dedicated method to write Triangle into _wkb data
   */
  void
  writeInner(const Triangle      &g,
             boost::endian::order wkbOrder = boost::endian::order::native);

  /**
   * Dedicated method to write Point into _wkb data
   */
  void
  writeCoordinate(const Point         &g,
                  boost::endian::order wkbOrder = boost::endian::order::native);

  /**
   * Method to write Geometry into _wkb data
   * Only for recursive call use
   */
  void
  writeRec(const Geometry      &g,
           boost::endian::order wkbOrder = boost::endian::order::native);

  std::ostream &_s;

  /**
   * if false, will read the wkb as binary string, else will read the string as
   * hex ascii string (ie. 2 chars for 1 byte with values matching [0-9A-F]
   */
  bool _asHexString;

  template <std::size_t N>
  auto
  toStream(const std::array<std::byte, N> &arr) -> void
  {
    if (_asHexString) {
      for (const std::byte &byteVal : arr) {
        _s << _prefix << std::hex << std::setw(2) << std::setfill('0')
           << static_cast<int>(byteVal);
      }
    } else {
      for (const std::byte &byteVal : arr) {
        _s << static_cast<unsigned char>(byteVal);
      }
    }
  }

  template <typename T>
  auto
  toByte(const T x, boost::endian::order byteOrder) -> void
  {
    T y = x;
    if (boost::endian::order::native != byteOrder) {
      boost::endian::endian_reverse_inplace(y);
    }
    toStream(*reinterpret_cast<std::array<std::byte, sizeof(T)> *>(&y));
  }

  srid_t _srid;

  bool        _useSrid = false;
  bool        _isEWKB  = false;
  std::string _prefix;
};

} // namespace SFCGAL::detail::io

#endif
