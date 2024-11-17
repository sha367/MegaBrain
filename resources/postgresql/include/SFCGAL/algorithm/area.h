// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_ALGORITHM_AREA_H_
#define SFCGAL_ALGORITHM_AREA_H_

#include "SFCGAL/Geometry.h"
#include "SFCGAL/Kernel.h"

namespace SFCGAL {
namespace algorithm {
struct NoValidityCheck;

/**
 * @brief Compute the 2D area for a Geometry
 * @ingroup public_api
 * @warning Z component is ignored, there is no 2D projection for 3D geometries
 * @ingroup public_api
 * @pre g is a valid geometry
 */
SFCGAL_API double
area(const Geometry &g);

/**
 * @brief Compute the 2D area for a Geometry
 *
 * @warning Z component is ignored, there is no 2D projection for 3D geometries
 * @ingroup detail
 * @pre g is a valid geometry
 * @warning No actual validity check is done
 */
SFCGAL_API double
area(const Geometry &g, NoValidityCheck);

/**
 * @brief Compute the 2D signed area for a Triangle
 * @ingroup detail
 */
SFCGAL_API Kernel::FT
           signedArea(const Triangle &g);
/**
 * @brief Compute the 2D signed area for a closed LineString
 * @ingroup detail
 */
SFCGAL_API Kernel::FT
           signedArea(const LineString &g);

/**
 * Returns Compute the 2D area for a Triangle
 * @ingroup detail
 */
SFCGAL_API double
area(const Triangle &g);
/**
 * Returns Compute the 2D area for a Polygon
 * @ingroup detail
 */
SFCGAL_API double
area(const Polygon &g);
/**
 * Returns the 2D area for a GeometryCollection
 * @ingroup detail
 */
SFCGAL_API double
area(const GeometryCollection &g);
/**
 * Returns the 2D area for a TriangulatedSurface
 * @ingroup detail
 */
SFCGAL_API double
area(const TriangulatedSurface &g);
/**
 * Returns the 2D area for a TriangulatedSurface
 * @ingroup detail
 */
SFCGAL_API double
area(const PolyhedralSurface &g);

/**
 * Returns 3D area for a Geometry
 * @ingroup public_api
 * @warning Solid area is set to 0 (might be defined as the area of the surface)
 * @ingroup public_api
 * @pre g is a valid geometry
 */
SFCGAL_API double
area3D(const Geometry &g);

/**
 * Returns 3D area for a Geometry
 *
 * @warning Solid area is set to 0 (might be defined as the area of the surface)
 * @ingroup detail
 * @pre g is a valid geometry
 * @warning No actual validity check is done
 */
SFCGAL_API double
area3D(const Geometry &g, NoValidityCheck);

/**
 * Returns 3D area for a Polygon
 * @ingroup detail
 */
SFCGAL_API double
area3D(const Polygon &g);
/**
 * Returns the 3D area for a MultiPolygon
 * @ingroup detail
 */
SFCGAL_API double
area3D(const GeometryCollection &g);

/**
 * Returns the 3D area for a PolyhedralSurface
 * @ingroup detail
 */
SFCGAL_API double
area3D(const PolyhedralSurface &g);

/**
 * Returns the 3D area for a Triangle
 * @ingroup detail
 */
SFCGAL_API double
area3D(const Triangle &g);

/**
 * Returns the 3D area for a TriangulatedSurface
 * @ingroup detail
 */
SFCGAL_API double
area3D(const TriangulatedSurface &g);

} // namespace algorithm
} // namespace SFCGAL

#endif
