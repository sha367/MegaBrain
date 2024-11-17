// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_DETAIL_GETPOINTSVISITOR_H_
#define SFCGAL_DETAIL_GETPOINTSVISITOR_H_

#include "SFCGAL/config.h"

#include "SFCGAL/GeometryVisitor.h"
#include <vector>

namespace SFCGAL {
namespace detail {

/**
 * Get the list of points from a Geometry
 */
class SFCGAL_API GetPointsVisitor : public ConstGeometryVisitor {
public:
  virtual void
  visit(const Point &g);
  virtual void
  visit(const LineString &g);
  virtual void
  visit(const Polygon &g);
  virtual void
  visit(const Triangle &g);
  virtual void
  visit(const Solid &g);
  virtual void
  visit(const MultiPoint &g);
  virtual void
  visit(const MultiLineString &g);
  virtual void
  visit(const MultiPolygon &g);
  virtual void
  visit(const MultiSolid &g);
  virtual void
  visit(const GeometryCollection &g);
  virtual void
  visit(const PolyhedralSurface &g);
  virtual void
  visit(const TriangulatedSurface &g);

public:
  typedef std::vector<const Point *>::const_iterator const_iterator;
  std::vector<const Point *>                         points;
};

} // namespace detail
} // namespace SFCGAL

#endif
