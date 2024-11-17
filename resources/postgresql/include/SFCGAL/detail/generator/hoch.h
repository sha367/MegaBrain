// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_GENERATOR_HOCH_H_
#define SFCGAL_GENERATOR_HOCH_H_

#include "SFCGAL/config.h"

#include <memory>

namespace SFCGAL {
class Polygon;
}

namespace SFCGAL {
namespace generator {

/**
 * generate hoch snowflake
 * @todo unittest
 */
SFCGAL_API std::unique_ptr<Polygon>
           hoch(const unsigned int &order);

} // namespace generator
} // namespace SFCGAL

#endif
