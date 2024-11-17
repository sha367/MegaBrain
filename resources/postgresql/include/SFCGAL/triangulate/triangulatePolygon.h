// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_TRIANGULATE_TRIANGULATEPOLYGON_H_
#define SFCGAL_TRIANGULATE_TRIANGULATEPOLYGON_H_

#include "SFCGAL/config.h"

#include "SFCGAL/Geometry.h"

namespace SFCGAL {
namespace triangulate {

/**
 * @brief Triangulate 3D polygons in a Geometry.
 *
 * @param g input geometry
 * @param triangulatedSurface resulting TriangulatedSurface
 * @param usePolygonPlanes use polygon plane or Triangulate in OXY plane
 * @todo unittest
 * @ingroup detail
 */
SFCGAL_API void
triangulatePolygon3D(const Geometry      &g,
                     TriangulatedSurface &triangulatedSurface);
/**
 * @brief Triangulate a 3D Polygon
 * @todo unittest
 * @ingroup detail
 */
SFCGAL_API void
triangulatePolygon3D(const Polygon       &g,
                     TriangulatedSurface &triangulatedSurface);
/**
 * @brief Triangulate a 3D Triangle (copy triangle)
 * @todo unittest
 * @ingroup detail
 */
SFCGAL_API void
triangulatePolygon3D(const Triangle      &g,
                     TriangulatedSurface &triangulatedSurface);
/**
 * @brief Triangulate a 3D TriangulatedSurface (copy triangles)
 *
 * @todo unittest
 * @ingroup detail
 */
SFCGAL_API void
triangulatePolygon3D(const TriangulatedSurface &g,
                     TriangulatedSurface       &triangulatedSurface);
/**
 * @brief Triangulate a 3D MultiPolygon
 * @todo unittest
 * @ingroup detail
 */
SFCGAL_API void
opentriangulatePolygon3D(const GeometryCollection &g,
                         TriangulatedSurface      &triangulatedSurface);
/**
 * @brief Triangulate 3D polygons in a PolyhedralSurface.
 *
 * @todo unittest
 * @ingroup detail
 */
SFCGAL_API void
triangulatePolygon3D(const PolyhedralSurface &polyhedralSurface,
                     TriangulatedSurface     &triangulatedSurface);
/**
 * @brief Triangulate a Solid
 *
 * @todo unittest
 * @ingroup detail
 */
SFCGAL_API void
triangulatePolygon3D(const Solid &g, TriangulatedSurface &triangulatedSurface);

} // namespace triangulate
} // namespace SFCGAL

#endif
