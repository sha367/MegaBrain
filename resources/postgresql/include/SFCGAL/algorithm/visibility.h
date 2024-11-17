// Copyright (c) 2023-2023, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_ALGORITHM_VISIBILITY2D_H_
#define SFCGAL_ALGORITHM_VISIBILITY2D_H_

#include "SFCGAL/config.h"

#include <memory>

namespace SFCGAL {
class Geometry;
class Polygon;
} // namespace SFCGAL

namespace SFCGAL {
namespace algorithm {
struct NoValidityCheck;

/**
 * @brief build the visibility polygon of a Point inside a Polygon
 * @param polygon input geometry
 * @param point input geometry
 * @ingroup public_api
 * @pre polygon is a valid geometry
 * @pre point must be inside polygon or on the boundary
 */
SFCGAL_API auto
visibility(const Geometry &polygon, const Geometry &point)
    -> std::unique_ptr<Polygon>;

/**
 * @brief build the visibility polygon of a Point inside a Polygon
 * @param polygon input geometry
 * @param point input geometry
 * @ingroup public_api
 * @pre polygon is a valid geometry
 * @pre point must be inside polygon or on the boundary
 * @warning No actual validity check is done
 */
SFCGAL_API auto
visibility(const Geometry &polygon, const Geometry &point, NoValidityCheck)
    -> std::unique_ptr<Polygon>;

/**
 * @brief build the visibility polygon of the segment [pointA ; pointB] on a
 * Polygon
 * @param polygon input geometry
 * @param pointA input geometry
 * @param pointB input geometry
 * @ingroup public_api
 * @pre polygon is a valid geometry
 * @pre pointA and pointB must be vertices of poly, adjacents and respect the
 * direction
 */
SFCGAL_API auto
visibility(const Geometry &polygon, const Geometry &pointA,
           const Geometry &pointB) -> std::unique_ptr<Polygon>;

/**
 * @brief build the visibility polygon of a Point inside a Polygon
 * @param polygon input geometry
 * @param pointA input geometry
 * @param pointB input geometry
 * @ingroup public_api
 * @pre polygon is a valid geometry
 * @warning No actual validity check is done
 * @pre pointA and pointB must be vertices of poly, adjacents and respect the
 * direction
 */
SFCGAL_API auto
visibility(const Geometry &polygon, const Geometry &pointA,
           const Geometry &pointB, NoValidityCheck) -> std::unique_ptr<Polygon>;

} // namespace algorithm
} // namespace SFCGAL

#endif
