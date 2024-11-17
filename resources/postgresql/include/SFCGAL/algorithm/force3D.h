// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_ALGORITHM_FORCE3D_H_
#define SFCGAL_ALGORITHM_FORCE3D_H_

#include "SFCGAL/config.h"

#include "SFCGAL/Kernel.h"

namespace SFCGAL {
class Geometry;
}

namespace SFCGAL {
namespace algorithm {

/**
 * @brief force a 2D geometry to be 3D (replace undefined Z by defaultZ,
 * existing Z values remains unchanged)
 * @warning ignore empty geometries
 */
SFCGAL_API void
force3D(Geometry &g, const Kernel::FT &defaultZ = 0);

} // namespace algorithm
} // namespace SFCGAL

#endif
