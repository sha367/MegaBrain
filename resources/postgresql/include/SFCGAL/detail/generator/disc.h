// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_GENERATOR_DISC_H_
#define SFCGAL_GENERATOR_DISC_H_

#include "SFCGAL/config.h"

#include <memory>

namespace SFCGAL {
class Point;
class Polygon;
} // namespace SFCGAL

namespace SFCGAL {
namespace generator {

/**
 * Generate a discrete circle
 * @todo unittest
 */
SFCGAL_API std::unique_ptr<Polygon>
           disc(const Point &center, const double &radius,
                const unsigned int &nQuadrantSegments = 8U);

} // namespace generator
} // namespace SFCGAL

#endif
