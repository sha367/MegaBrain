// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_TRANSLATE_H_
#define SFCGAL_TRANSLATE_H_

#include "SFCGAL/export.h"

#include "SFCGAL/Kernel.h"

namespace SFCGAL {
class Geometry;
}

namespace SFCGAL {
namespace algorithm {

/**
 * @brief translate a geometry from a given vector
 */
SFCGAL_API void
translate(Geometry &g, const Kernel::Vector_3 &v);
/**
 * @brief translate a geometry from a given vector
 */
SFCGAL_API void
translate(Geometry &g, const Kernel::Vector_2 &v);
/**
 * @brief translate a geometry from a given vector
 */
SFCGAL_API void
translate(Geometry &g, const Kernel::FT &dx, const Kernel::FT &dy,
          const Kernel::FT &dz);

/**
 * @brief translate a geometry from double-coordinates
 */
SFCGAL_API void
translate(Geometry &g, const double &dx, const double &dy, const double &dz);

} // namespace algorithm
} // namespace SFCGAL

#endif
