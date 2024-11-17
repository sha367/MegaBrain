// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_COVERS_POINTS_ALGORITHM
#define SFCGAL_COVERS_POINTS_ALGORITHM

#include "SFCGAL/config.h"

#include <vector>

namespace SFCGAL {
class Geometry;
namespace detail {
namespace algorithm {

/**
 * Pseudo cover test on 2D geometries. Collect points of gb and tests if no
 * points of gb is outside ga
 * @ingroup@ detail
 */
SFCGAL_API bool
coversPoints(const Geometry &ga, const Geometry &gb);

/**
 * Pseudo cover test on 3D geometries. Collect points of gb and tests if no
 * points of gb is outside ga
 * @ingroup@ detail
 */
SFCGAL_API bool
coversPoints3D(const Geometry &ga, const Geometry &gb);
} // namespace algorithm
} // namespace detail
} // namespace SFCGAL

#endif
