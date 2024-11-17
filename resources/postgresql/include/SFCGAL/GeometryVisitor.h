// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_GEOMETRYVISITOR_H_
#define SFCGAL_GEOMETRYVISITOR_H_

#include "SFCGAL/Geometry.h"

namespace SFCGAL {

/**
 * GeometryVisitor
 */
class SFCGAL_API GeometryVisitor {
public:
  virtual ~GeometryVisitor();

  /**
   * apply visitor
   */
  virtual void
  visit(Geometry &g);

  virtual void
  visit(Point &g) = 0;
  virtual void
  visit(LineString &g) = 0;
  virtual void
  visit(Polygon &g) = 0;
  virtual void
  visit(Triangle &g) = 0;
  virtual void
  visit(Solid &g) = 0;
  virtual void
  visit(MultiPoint &g) = 0;
  virtual void
  visit(MultiLineString &g) = 0;
  virtual void
  visit(MultiPolygon &g) = 0;
  virtual void
  visit(MultiSolid &g) = 0;
  virtual void
  visit(GeometryCollection &g) = 0;
  virtual void
  visit(PolyhedralSurface &g) = 0;
  virtual void
  visit(TriangulatedSurface &g) = 0;
};

/**
 * Visitor for const geometries
 */
class SFCGAL_API ConstGeometryVisitor {
public:
  virtual ~ConstGeometryVisitor();

  /**
   * apply visitor
   */
  virtual void
  visit(const Geometry &g);

  virtual void
  visit(const Point &g) = 0;
  virtual void
  visit(const LineString &g) = 0;
  virtual void
  visit(const Polygon &g) = 0;
  virtual void
  visit(const Triangle &g) = 0;
  virtual void
  visit(const Solid &g) = 0;
  virtual void
  visit(const MultiPoint &g) = 0;
  virtual void
  visit(const MultiLineString &g) = 0;
  virtual void
  visit(const MultiPolygon &g) = 0;
  virtual void
  visit(const MultiSolid &g) = 0;
  virtual void
  visit(const GeometryCollection &g) = 0;
  virtual void
  visit(const PolyhedralSurface &g) = 0;
  virtual void
  visit(const TriangulatedSurface &g) = 0;
};

} // namespace SFCGAL

#endif
