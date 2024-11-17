// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_ALGORITHM_STRAIGHTSKELETON_H_
#define SFCGAL_ALGORITHM_STRAIGHTSKELETON_H_

#include "SFCGAL/PolyhedralSurface.h"
#include "SFCGAL/algorithm/extrude.h"
#include "SFCGAL/algorithm/union.h"
#include "SFCGAL/config.h"
#include <memory>

namespace SFCGAL {
class Geometry;
class Polygon;
class MultiPolygon;
class MultiLineString;
} // namespace SFCGAL

namespace SFCGAL {
namespace algorithm {
struct NoValidityCheck;

/**
 * @brief build an approximate medial axis for a Polygon
 * @param g input geometry
 * @ingroup public_api
 * @pre g is a valid geometry
 * @throws NotImplementedException If g is a Polygon with point touching rings.
 */
SFCGAL_API std::unique_ptr<MultiLineString>
           approximateMedialAxis(const Geometry &g);

/**
 * @brief build a 2D straight skeleton for a Polygon
 * @todo add supports for TriangulatedSurface and PolyhedralSurface
 * @param g input geometry
 * @param autoOrientation check and fix polygon orientation
 * @param outputM whether to output the distance to border as M
 * @param toleranceAbs Distance tolerance between returned points. A line must
 * have a maximum distance of toleranceAbs.
 * @ingroup public_api
 * @pre g is a valid geometry
 * @throws NotImplementedException If g is a Polygon with point touching rings.
 */
SFCGAL_API std::unique_ptr<MultiLineString>
           straightSkeleton(const Geometry &g, bool autoOrientation = true,
                            bool innerOnly = false, bool outputDistanceInM = false,
                            const double &toleranceAbs = 1e-8);

/**
 * @brief build a 2D straight skeleton for a Polygon
 * @param g input geometry
 * @param autoOrientation check and fix polygon orientation
 * @param outputM whether to output the distance to border as M
 * @param toleranceAbs Distance tolerance between returned points. A line must
 * have a maximum distance of toleranceAbs.
 * @ingroup public_api
 * @pre g is a valid geometry
 * @warning No actual validity check is done
 * @throws NotImplementedException If g is a Polygon with point touching rings.
 */
SFCGAL_API std::unique_ptr<MultiLineString>
straightSkeleton(const Geometry &g, bool autoOrientation, NoValidityCheck,
                 bool innerOnly = false, bool outputDistanceInM = false,
                 const double &toleranceAbs = 1e-8);

/**
 * @brief build a 2D straight skeleton for a Polygon
 * @ingroup detail
 * @throws NotImplementedException If g is a Polygon with point touching rings.
 */
SFCGAL_API std::unique_ptr<MultiLineString>
           straightSkeleton(const Polygon &g, bool autoOrientation = true,
                            bool innerOnly = false, bool outputDistanceInM = false,
                            const double &toleranceAbs = 1e-8);

/**
 * @brief build a 2D straight skeleton for a Polygon
 * @ingroup detail
 * @throws NotImplementedException If g is a Polygon with point touching rings.
 */
SFCGAL_API std::unique_ptr<MultiLineString>
           straightSkeleton(const MultiPolygon &g, bool autoOrientation = true,
                            bool innerOnly = false, bool outputDistanceInM = false,
                            const double &toleranceAbs = 1e-8);

/**
 * @brief build a 3D straight skeleton extruded for a Polygon
 * @ingroup detail
 * @throws NotImplementedException If g is a Polygon with point touching rings.
 */
SFCGAL_API auto
extrudedStraightSkeleton(const Polygon &g, double height)
    -> std::unique_ptr<PolyhedralSurface>;

SFCGAL_API auto
extrudeStraightSkeleton(const Geometry &g, double height)
    -> std::unique_ptr<PolyhedralSurface>;

SFCGAL_API auto
extrudeStraightSkeleton(const Geometry &g, double building_height,
                        double roof_height)
    -> std::unique_ptr<PolyhedralSurface>;

/**
 * @brief Build a 2D straight skeleton partition for a Geometry
 * @ingroup public_api
 * @param[in] g The input geometry
 * @param[in] autoOrientation Check and fix polygon orientation
 * @return A unique pointer to a MultiPolygon representing the partitioned
 * geometry
 * @throws Exception If CGAL fails to create the straight skeleton
 * @note Only Triangle, Polygon, and MultiPolygon geometries are supported
 *
 * This function creates a partition of the input geometry based on its straight
 * skeleton. For unsupported geometry types, an empty MultiPolygon is returned.
 */
SFCGAL_API std::unique_ptr<MultiPolygon>
straightSkeletonPartition(const Geometry &g, bool autoOrientation = true);

/**
 * @brief Build a 2D straight skeleton partition for a Polygon
 * @ingroup detail
 * @param[in] g The input polygon
 * @param[in] autoOrientation Check and fix polygon orientation (not used in
 * this implementation)
 * @return A unique pointer to a MultiPolygon representing the partitioned
 * polygon
 * @throws Exception If CGAL fails to create the straight skeleton
 *
 * This function creates a partition of the input polygon based on its straight
 * skeleton. It uses CGAL's Arrangement_2 to handle the intersection of skeleton
 * and polygon edges.
 */
SFCGAL_API std::unique_ptr<MultiPolygon>
straightSkeletonPartition(const Polygon &g, bool autoOrientation = true);

/**
 * @brief Build a 2D straight skeleton partition for a MultiPolygon
 * @ingroup detail
 * @param[in] g The input multi-polygon
 * @param[in] autoOrientation Check and fix polygon orientation
 * @return A unique pointer to a MultiPolygon representing the partitioned
 * multi-polygon
 *
 * This function applies the straight skeleton partition to each polygon in the
 * input multi-polygon and combines the results into a single MultiPolygon.
 */
SFCGAL_API std::unique_ptr<MultiPolygon>
straightSkeletonPartition(const MultiPolygon &g, bool autoOrientation = true);

} // namespace algorithm
} // namespace SFCGAL

#endif
