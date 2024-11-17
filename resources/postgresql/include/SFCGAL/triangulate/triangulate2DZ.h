// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_TRIANGULATE_TRIANGULATE2DZ_H_
#define SFCGAL_TRIANGULATE_TRIANGULATE2DZ_H_

#include "SFCGAL/config.h"

#include "SFCGAL/Geometry.h"
#include "SFCGAL/detail/triangulate/ConstraintDelaunayTriangulation.h"

namespace SFCGAL {
namespace triangulate {
/**
 * @brief Constraint 2DZ Delaunay Triangulation (keep Z if defined, a
 * projectionPlane may be provided)
 */
SFCGAL_API void
triangulate2DZ(const Geometry &g, ConstraintDelaunayTriangulation &triangulate);
/**
 * @brief Constraint 2DZ Delaunay Triangulation (keep Z if defined, project
 * points in OXY plane)
 */
SFCGAL_API ConstraintDelaunayTriangulation
triangulate2DZ(const Geometry &g);

} // namespace triangulate
} // namespace SFCGAL

#endif
