// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_ALGORITHM_BOUNDARYVISITOR_H_
#define SFCGAL_ALGORITHM_BOUNDARYVISITOR_H_

#include "SFCGAL/GeometryVisitor.h"

#include "SFCGAL/detail/graph/GeometryGraph.h"
#include "SFCGAL/detail/graph/GeometryGraphBuilder.h"

namespace SFCGAL {
namespace algorithm {

/**
 * Compute the boundary for a Geometry
 *
 * boundary( Point )      : GEOMETRYCOLLECTION EMPTY
 * boundary( LineString ) : either GEOMETRYCOLLECTION EMPTY is the LineString is
 * closed, or MULTIPOINT(2) boundary( Polygon )    : LINESTRING |
 * MULTILINESTRING (polygon rings) boundary( Triangle )   : either
 * GEOMETRYCOLLECTION EMPTY is the LineString is closed, or MULTIPOINT(2)
 *
 * boundary( MultiPoint )      : GEOMETRYCOLLECTION EMPTY
 * boundary( MultiLineString ) : either GEOMETRYCOLLECTION EMPTY or single
 * occurance points
 *
 * @warning GeometryCollection are not supported in the general case
 *
 * @ŧodo Solid
 *
 * @todo MultiPolygon, PolyhedralSurface, TriangulatedSurface (same graph
 * algorithm, edges without parallel or opposite)
 *
 *
 * @todo GeometryCollection : complex for heterogeneous collection (not
 * supported in GEOS)
 * @todo MultiSolid : faced elimination
 * @ingroup detail
 *
 */
class SFCGAL_API BoundaryVisitor : public ConstGeometryVisitor {
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

  /**
   * get the boundary
   */
  Geometry *
  releaseBoundary();

protected:
  /**
   * get the boundary vertices for a set of LineString in a GeometryGraph
   */
  void
  getBoundaryFromLineStrings(const graph::GeometryGraph &g);
  /**
   * get the boundary edges for a set of Polygons in a GeometryGraph
   * @warning not optimal (edges could be counted using complex<
   * vertex_descriptor >)
   * @todo merge resulting edges
   */
  void
  getBoundaryFromPolygons(const graph::GeometryGraph &g);

private:
  std::unique_ptr<Geometry> _boundary;
};

} // namespace algorithm
} // namespace SFCGAL

#endif
