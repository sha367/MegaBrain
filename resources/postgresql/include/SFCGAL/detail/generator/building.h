// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_GENERATOR_BUILDING_H_
#define SFCGAL_GENERATOR_BUILDING_H_

#include "SFCGAL/config.h"

#include <memory>

#include "SFCGAL/Kernel.h"

namespace SFCGAL {
class Geometry;
class Polygon;
} // namespace SFCGAL

namespace SFCGAL {
namespace generator {

/**
 * @brief Basic building generator relying on a straight skeleton
 *
 * @warning only supports Polygon and MultiPolygon
 * @todo unittest
 */
SFCGAL_API std::unique_ptr<Geometry>
           building(const Geometry &g, const Kernel::FT &wallHeight,
                    const Kernel::FT &roofSlope);

} // namespace generator
} // namespace SFCGAL

#endif
