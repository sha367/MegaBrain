// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_UNION_ALGORITHM
#define SFCGAL_UNION_ALGORITHM

#include "SFCGAL/config.h"

#include <memory>

namespace SFCGAL {
class Geometry;
namespace detail {
template <int Dim>
class GeometrySet;
template <int Dim>
struct PrimitiveHandle;
} // namespace detail

namespace algorithm {
struct NoValidityCheck;

/**
 * Union on 2D geometries.
 * @pre ga and gb are valid geometries
 * @ingroup public_api
 */
SFCGAL_API std::unique_ptr<Geometry>
           union_(const Geometry &ga, const Geometry &gb);

/**
 * Union on 2D geometries. No validity check variant
 * @pre ga and gb are valid geometries
 * @ingroup detail
 * @warning No actual validity check is done.
 */
SFCGAL_API std::unique_ptr<Geometry>
           union_(const Geometry &ga, const Geometry &gb, NoValidityCheck);

/**
 * Union on 3D geometries. Assume z = 0 if needed
 * @pre ga and gb are valid geometries
 * @ingroup public_api
 */
SFCGAL_API std::unique_ptr<Geometry>
           union3D(const Geometry &ga, const Geometry &gb);

/**
 * Union on 3D geometries. Assume z = 0 if needed
 * @pre ga and gb are valid geometries
 * @ingroup detail
 * @warning@ No actual validity check is done
 */
SFCGAL_API std::unique_ptr<Geometry>
           union3D(const Geometry &ga, const Geometry &gb, NoValidityCheck);

/**
 * @ingroup detail
 */
template <int Dim>
void
union_(const detail::GeometrySet<Dim> &a, const detail::GeometrySet<Dim> &b,
       detail::GeometrySet<Dim> &);

/**
 * @ingroup detail
 */
template <int Dim>
void
union_(const detail::PrimitiveHandle<Dim> &a,
       const detail::PrimitiveHandle<Dim> &b, detail::GeometrySet<Dim> &);

} // namespace algorithm
} // namespace SFCGAL

#endif
