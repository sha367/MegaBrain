/**
 *   SFCGAL
 *
 *   Copyright (C) 2021 Loïc Bartoletti - Oslandia <infos@oslandia.com>
 *
 *   This library is free software; you can redistribute it and/or
 *   modify it under the terms of the GNU Library General Public
 *   License as published by the Free Software Foundation; either
 *   version 2 of the License, or (at your option) any later version.
 *
 *   This library is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *   Library General Public License for more details.

 *   You should have received a copy of the GNU Library General Public
 *   License along with this library; if not, see
 <http://www.gnu.org/licenses/>.
 */

#ifndef SFCGAL_ALGORITHM_ALPHASHAPES_H_
#define SFCGAL_ALGORITHM_ALPHASHAPES_H_

#include "SFCGAL/config.h"

#include "SFCGAL/Geometry.h"

namespace SFCGAL {
namespace algorithm {

/**
 * Compute the 2D alpha shapes for a geometry
 * https://doc.cgal.org/latest/Alpha_shapes_2/index.html#Chapter_2D_Alpha_Shapes
 * @ingroup public_api
 * @since 1.4.1
 */
SFCGAL_API auto
alphaShapes(const Geometry &g, double alpha = 1, bool allow_holes = false)
    -> std::unique_ptr<Geometry>;

/**
 * Compute the optimal 2D alpha shapes for a geometry
 * https://doc.cgal.org/latest/Alpha_shapes_2/index.html#Chapter_2D_Alpha_Shapes
 * @ingroup public_api
 * @since 1.4.1
 */
SFCGAL_API auto
optimal_alpha_shapes(const Geometry &g, bool allow_holes = false,
                     size_t nb_components = 1) -> std::unique_ptr<Geometry>;

} // namespace algorithm
} // namespace SFCGAL

#endif
