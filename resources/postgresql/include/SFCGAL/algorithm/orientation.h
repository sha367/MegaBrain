// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_ALGORITHM_ORIENTATION_H_
#define SFCGAL_ALGORITHM_ORIENTATION_H_

#include "SFCGAL/config.h"

#include "SFCGAL/Geometry.h"
#include "SFCGAL/Kernel.h"

#include <CGAL/Polygon_2.h>
#include <CGAL/Polygon_with_holes_2.h>

namespace SFCGAL {
namespace algorithm {

/**
 * Make valid 2D orientation
 */
SFCGAL_API void
makeValidOrientation(CGAL::Polygon_2<Kernel> &polygon);
/**
 * Make valid 2D orientation
 */
SFCGAL_API void
makeValidOrientation(CGAL::Polygon_with_holes_2<Kernel> &polygon);
/**
 * Make valid 2D orientation
 */
SFCGAL_API void
makeValidOrientation(Polygon &polygon);

/**
 * Test if a Geometry has a consistent orientation
 */
SFCGAL_API bool
hasConsistentOrientation3D(const TriangulatedSurface &g);
/**
 * Test if a PolyhedralSurface has a consistent orientation
 */
SFCGAL_API bool
hasConsistentOrientation3D(const PolyhedralSurface &g);

/**
 * Try to make consistent orientation in a TriangulatedSurface
 */
SFCGAL_API void
makeConsistentOrientation3D(TriangulatedSurface &g);

/**
 * Test if a 2D surface is oriented counter clockwise
 */
SFCGAL_API bool
isCounterClockWiseOriented(const Polygon &);

/**
 * Test if a 2D surface is oriented counter clockwise
 */
SFCGAL_API bool
isCounterClockWiseOriented(const Triangle &);

/**
 * Test if a 2D surface is oriented counter clockwise
 */
SFCGAL_API bool
isCounterClockWiseOriented(const LineString &);

} // namespace algorithm
} // namespace SFCGAL

#endif
