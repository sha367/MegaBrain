// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_ALGORITHM_VOLUME_H_
#define SFCGAL_ALGORITHM_VOLUME_H_

#include "SFCGAL/Geometry.h"
#include "SFCGAL/Kernel.h"
#include "SFCGAL/export.h"

namespace SFCGAL {
namespace algorithm {

struct NoValidityCheck;

/**
 * Computes the volume of a geometry
 * @pre g is a valid Geometry
 * @ingroup public_api
 */
SFCGAL_API const Kernel::FT
                 volume(const Geometry &g);

/**
 * Computes the volume of a Solid
 * @pre (not checked) volume is closed and consistently oriented
 * @ingroup detail
 */
SFCGAL_API const Kernel::FT
                 volume(const Solid &g, NoValidityCheck);

} // namespace algorithm
} // namespace SFCGAL

#endif
