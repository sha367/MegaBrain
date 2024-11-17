// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_ALGORITHM_ISVALID_H_
#define SFCGAL_ALGORITHM_ISVALID_H_

#include "SFCGAL/Geometry.h"
#include "SFCGAL/Validity.h"
#include "SFCGAL/algorithm/force2D.h"
#include "SFCGAL/algorithm/force3D.h"

namespace SFCGAL {

/**
 * Functions used to assert for geometry validity
 * @note exception message is apparently limited in length, thus print the
 * reason for invalidity before its text representation (that can be very long)
 */
void SFCGAL_API
SFCGAL_ASSERT_GEOMETRY_VALIDITY(const Geometry &g);
void SFCGAL_API
SFCGAL_ASSERT_GEOMETRY_VALIDITY_2D(const Geometry &g);
void SFCGAL_API
SFCGAL_ASSERT_GEOMETRY_VALIDITY_3D(const Geometry &g);
void SFCGAL_API
SFCGAL_ASSERT_GEOMETRY_VALIDITY_ON_PLANE(const Geometry &g);

namespace algorithm {

/**
 * @brief Check validity of a geometry
 * @ingroup public_api
 */
SFCGAL_API const Validity
isValid(const Geometry &g, const double &toleranceAbs = 1e-9);

/**
 * Sets the geometry flag on a geometry and propagate to every internal
 * geometries
 * @ingroup public_api
 */
SFCGAL_API void
propagateValidityFlag(Geometry &g, bool valid);

/**
 * Tag used for variants of algorithm that do not do validity check
 * @ingroup public_api
 */
struct NoValidityCheck {};

} // namespace algorithm
} // namespace SFCGAL

#endif
