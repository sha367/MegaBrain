// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_ALGORITHM_LENGTH_H_
#define SFCGAL_ALGORITHM_LENGTH_H_

#include "SFCGAL/config.h"

namespace SFCGAL {
class Geometry;
class LineString;
class GeometryCollection;
} // namespace SFCGAL

namespace SFCGAL {
namespace algorithm {

/**
 * @brief Compute the 2D length for a Geometry (0 for incompatible types)
 */
SFCGAL_API double
length(const Geometry &g);
/**
 * @brief Compute the 2D length for a LineString
 */
SFCGAL_API double
length(const LineString &g);
/**
 * @brief Compute the 2D length for a GeometryCollection
 */
SFCGAL_API double
length(const GeometryCollection &g);

/**
 * @brief Compute the 2D length for a geometry
 * @return the length of the Geometry, 0 for incompatible types
 */
SFCGAL_API double
length3D(const Geometry &g);
/**
 * @brief Compute the 3D length for a LineString
 */
SFCGAL_API double
length3D(const LineString &g);
/**
 * @brief Compute the 3D length for a GeometryCollection
 */
SFCGAL_API double
length3D(const GeometryCollection &g);

} // namespace algorithm
} // namespace SFCGAL

#endif
