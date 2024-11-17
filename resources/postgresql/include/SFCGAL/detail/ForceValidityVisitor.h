// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_DETAIL_FORCEVALIDITY_VISITOR_H_
#define SFCGAL_DETAIL_FORCEVALIDITY_VISITOR_H_

#include "SFCGAL/config.h"

#include "SFCGAL/GeometryVisitor.h"

namespace SFCGAL {
namespace detail {

class SFCGAL_API ForceValidityVisitor : public GeometryVisitor {
public:
  ForceValidityVisitor(bool valid) : valid_(valid) {}
  virtual void
  visit(Point &g);
  virtual void
  visit(LineString &g);
  virtual void
  visit(Polygon &g);
  virtual void
  visit(Triangle &g);
  virtual void
  visit(Solid &g);
  virtual void
  visit(MultiPoint &g);
  virtual void
  visit(MultiLineString &g);
  virtual void
  visit(MultiPolygon &g);
  virtual void
  visit(MultiSolid &g);
  virtual void
  visit(GeometryCollection &g);
  virtual void
  visit(PolyhedralSurface &g);
  virtual void
  visit(TriangulatedSurface &g);

private:
  bool valid_;
};

} // namespace detail
} // namespace SFCGAL

#endif
