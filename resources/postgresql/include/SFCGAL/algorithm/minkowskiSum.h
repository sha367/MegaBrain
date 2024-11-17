// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_ALGORITHM_MINKOWSKISUM_H_
#define SFCGAL_ALGORITHM_MINKOWSKISUM_H_

#include "SFCGAL/config.h"

#include "SFCGAL/Geometry.h"
#include <memory>

namespace SFCGAL {
namespace algorithm {
struct NoValidityCheck;

/**
 * @brief 2D minkowski sum (p+q)
 *
 * @warning If gA is a polygon, its orientation is taken into account. A
 * "reversed" polygon (with a clockwise-oriented exterior ring) will involve a
 * minkowski difference rather than a sum.
 *
 * @todo missing cases (union)
 * @pre gA and gB are valid geometries
 * @ingroup public_api
 */
SFCGAL_API std::unique_ptr<Geometry>
           minkowskiSum(const Geometry &gA, const Polygon &gB);

/**
 * @brief 2D minkowski sum (p+q)
 *
 * @warning If gA is a polygon, its orientation is taken into account. A
 * "reversed" polygon (with a clockwise-oriented exterior ring) will involve a
 * minkowski difference rather than a sum.
 *
 * @todo missing cases (union)
 * @pre gA and gB are valid geometries
 * @ingroup detail
 * @warning@ No actual validity check is done.
 */
SFCGAL_API std::unique_ptr<Geometry>
           minkowskiSum(const Geometry &gA, const Polygon &gB, NoValidityCheck);

} // namespace algorithm
} // namespace SFCGAL

#endif
