// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_ALGORITHM_CONVEXHULL_H_
#define SFCGAL_ALGORITHM_CONVEXHULL_H_

#include "SFCGAL/config.h"

#include "SFCGAL/Geometry.h"

namespace SFCGAL {
namespace algorithm {

/**
 * Compute the 2D convex hull for a geometry
 * @ingroup public_api
 */
SFCGAL_API std::unique_ptr<Geometry>
           convexHull(const Geometry &g);

/**
 * Compute the 3D convex hull for a geometry
 * @todo improve to handle collinear points and coplanar points
 * @ingroup public_api
 */
SFCGAL_API std::unique_ptr<Geometry>
           convexHull3D(const Geometry &g);

} // namespace algorithm
} // namespace SFCGAL

#endif
