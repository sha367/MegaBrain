// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_COVERS_ALGORITHM
#define SFCGAL_COVERS_ALGORITHM

#include "SFCGAL/config.h"

#include <vector>

namespace SFCGAL {
class Geometry;
class Solid;
class Point;
namespace detail {
template <int Dim>
class GeometrySet;
template <int Dim>
struct PrimitiveHandle;
} // namespace detail

namespace algorithm {
/**
 * Cover test on 2D geometries. Checks if gA covers gB. Force projection to z=0
 * if needed
 * @ingroup@ detail
 */
SFCGAL_API bool
covers(const Geometry &ga, const Geometry &gb);

/**
 * Cover test on 3D geometries. Checks if gA covers gB. Assume z = 0 if needed
 */
SFCGAL_API bool
covers3D(const Geometry &ga, const Geometry &gb);

/**
 * @ingroup@ detail
 */
template <int Dim>
bool
covers(const detail::GeometrySet<Dim> &a, const detail::GeometrySet<Dim> &b);

/**
 * @ingroup@ detail
 */
template <int Dim>
bool
covers(const detail::PrimitiveHandle<Dim> &a,
       const detail::PrimitiveHandle<Dim> &b);
} // namespace algorithm
} // namespace SFCGAL

#endif
