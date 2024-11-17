// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_TRIANGULATE_IN_GEOMETRY_SET_H_
#define SFCGAL_TRIANGULATE_IN_GEOMETRY_SET_H_

#include "SFCGAL/config.h"

#include "SFCGAL/detail/GeometrySet.h"

namespace SFCGAL {
namespace triangulate {

/**
 * Populate the GeometrySet<3> geometry with the triangulation (list of
 * triangles) of a polyhedron
 */
SFCGAL_API void
triangulate(const detail::MarkedPolyhedron &polyhedron,
            detail::GeometrySet<3>         &geometry);
/**
 * Populate the GeometrySet<2> geometry with the triangulation (list of
 * polygons) of a polygon
 */
SFCGAL_API void
triangulate(const CGAL::Polygon_with_holes_2<Kernel> &polygon,
            detail::GeometrySet<2>                   &geometry);

} // namespace triangulate
} // namespace SFCGAL

#endif
