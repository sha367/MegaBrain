// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_IO_WKTWRITER_H_
#define SFCGAL_IO_WKTWRITER_H_

#include <sstream>

#include "SFCGAL/Geometry.h"
#include "SFCGAL/config.h"

namespace SFCGAL {
namespace detail {
namespace io {

/**
 * Writer for WKT
 *
 * @warning Triangles are transformed into polygons
 */
class SFCGAL_API WktWriter {
public:
  WktWriter(std::ostream &s);

  /**
   * @todo replace with visitor dispatch
   */
  void
  write(const Geometry &g, bool exact = false);

protected:
  /**
   * write coordinate type (""|" Z"|" ZM")
   */
  void
  writeCoordinateType(const Geometry &g);

  void
  writeCoordinate(const Point &g);

  void
  write(const Point &g);
  void
  writeInner(const Point &g);

  void
  write(const LineString &g);
  void
  writeInner(const LineString &g);

  void
  write(const Polygon &g);
  void
  writeInner(const Polygon &g);

  void
  write(const GeometryCollection &g);

  void
  write(const MultiPoint &g);
  void
  write(const MultiLineString &g);
  void
  write(const MultiPolygon &g);
  void
  write(const MultiSolid &g);

  void
  write(const Triangle &g);
  void
  writeInner(const Triangle &g);

  void
  write(const TriangulatedSurface &g);

  void
  write(const PolyhedralSurface &g);
  void
  writeInner(const PolyhedralSurface &g);

  void
  write(const Solid &g);
  void
  writeInner(const Solid &g);

  // for recursive call use
  void
  writeRec(const Geometry &g);

private:
  std::ostream &_s;
  bool          _exactWrite = false;
};

} // namespace io
} // namespace detail
} // namespace SFCGAL

#endif
