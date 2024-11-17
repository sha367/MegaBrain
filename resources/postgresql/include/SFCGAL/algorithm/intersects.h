// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_INTERSECTS_ALGORITHM
#define SFCGAL_INTERSECTS_ALGORITHM

#include "SFCGAL/config.h"

namespace SFCGAL {
class Geometry;
class LineString;
class PolyhedralSurface;
class TriangulatedSurface;
namespace detail {
template <int Dim>
class GeometrySet;
template <int Dim>
struct PrimitiveHandle;
} // namespace detail

namespace algorithm {
class SurfaceGraph;
// defined in isValid.h
struct NoValidityCheck;

/**
 * Robust intersection test on 2D geometries. Force projection to z=0 if needed
 * @pre ga and gb are valid geometries
 * @ingroup public_api
 */
SFCGAL_API bool
intersects(const Geometry &ga, const Geometry &gb);

/**
 * Robust intersection test on 3D geometries. Assume z = 0 if needed
 * @pre ga and gb are valid geometries
 * @ingroup public_api
 */
SFCGAL_API bool
intersects3D(const Geometry &ga, const Geometry &gb);

/**
 * Intersection test on 2D geometries. Force projection to z=0 if needed
 * @pre ga and gb are valid geometries
 * @ingroup detail
 * @warning the validity is assumed, no actual check is done
 */
SFCGAL_API bool
intersects(const Geometry &ga, const Geometry &gb, NoValidityCheck);

/**
 * Intersection test on 3D geometries. Assume z = 0 if needed
 * @pre ga and gb are valid geometries
 * @ingroup detail
 * @warning the validity is assumed, no actual check is done
 */
SFCGAL_API bool
intersects3D(const Geometry &ga, const Geometry &gb, NoValidityCheck);

/**
 * Intersection test on GeometrySet
 * @ingroup detail
 */
template <int Dim>
bool
intersects(const detail::GeometrySet<Dim> &a,
           const detail::GeometrySet<Dim> &b);

/**
 * Intersection test on a PrimitiveHandle
 * @ingroup detail
 */
template <int Dim>
bool
intersects(const detail::PrimitiveHandle<Dim> &a,
           const detail::PrimitiveHandle<Dim> &b);

/**
 * Self intersection test for 2D LineString (false if only endpoint touch)
 * @ingroup detail
 */
bool
selfIntersects(const LineString &l);

/**
 * Self intersection test for 3D LineString (false if only endpoints touch)
 * @ingroup detail
 */
bool
selfIntersects3D(const LineString &l);

/**
 * Self intersection test for 2D PolyhedralSurface (false if only point touch)
 * @ingroup detail
 */
bool
selfIntersects(const PolyhedralSurface &s, const SurfaceGraph &g);

/**
 * Self intersection test for 3D PolyhedralSurface (false if only point touch)
 * @ingroup detail
 */

bool
selfIntersects3D(const PolyhedralSurface &s, const SurfaceGraph &g);

/**
 * Self intersection test for 2D TriangulatedSurface (false if only point touch)
 * @ingroup detail
 */
bool
selfIntersects(const TriangulatedSurface &s, const SurfaceGraph &g);

/**
 * Self intersection test for 3D TriangulatedSurface (false if only point touch)
 * @ingroup detail
 */
bool
selfIntersects3D(const TriangulatedSurface &s, const SurfaceGraph &g);
} // namespace algorithm
} // namespace SFCGAL
#endif
