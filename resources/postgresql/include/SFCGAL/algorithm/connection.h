// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_GRAPH_ISCONNECTED_H_
#define SFCGAL_GRAPH_ISCONNECTED_H_

#include "SFCGAL/Coordinate.h"
#include "SFCGAL/Geometry.h"
#include "SFCGAL/Validity.h"
#include <boost/graph/adjacency_list.hpp>
#include <boost/graph/connected_components.hpp>
#include <boost/noncopyable.hpp>
#include <map>

namespace SFCGAL {
namespace algorithm {

/**
 * Represents a polyhedral surface as a graph where faces are nodes and egde are
 * graph edges
 * @pre the polygons are valid
 * @todo unittest
 * @ingroup detail
 */

class SFCGAL_API SurfaceGraph : boost::noncopyable {
public:
  typedef size_t                            VertexIndex;
  typedef size_t                            FaceIndex;
  typedef std::map<Coordinate, VertexIndex> CoordinateMap;
  static const size_t                       INVALID_INDEX;
  // an edge is inserted with vtx ordered by the first polygon we treat,
  // we search the edge with reverse ordered vtx indexes.
  // as a result, an inconsistent orientation between polygons can be spotted by
  // finding the edge in the same order
  // note that this situation may be caused if a face is duplicated
  typedef std::map<std::pair<VertexIndex, VertexIndex>,
                   std::pair<FaceIndex, FaceIndex>>
      EdgeMap;
  typedef boost::adjacency_list<boost::vecS, boost::vecS, boost::undirectedS>
      FaceGraph;
  /*
   * Construct from PolyHedralSurface
   * @throw Exception if surface is not connected
   */
  SurfaceGraph(const PolyhedralSurface &s);

  /*
   * Construct from TriangulatedSurface
   * @throw Exception if surface is not connected
   */
  SurfaceGraph(const TriangulatedSurface &tin);

  const EdgeMap &
  edgeMap() const
  {
    return _edgeMap;
  }
  const FaceGraph &
  faceGraph() const
  {
    return _graph;
  }
  // const CoordinateMap & coordMap() const { return _coordinateMap ; }
  const Validity
  isValid() const
  {
    return _isValid;
  }

private:
  CoordinateMap _coordinateMap;
  EdgeMap       _edgeMap;
  FaceGraph     _graph;
  VertexIndex   _numVertices;

  Validity _isValid;

  void
  addRing(const LineString &ring, FaceIndex faceIndex); // helper for ctor
};

/**
 * test if a surface is connected, the graph should be build beforehand
 * @ingroup detail
 */
SFCGAL_API bool
isConnected(const SurfaceGraph &graph);

/**
 * test if a surface is closed, the graph should be build beforehand
 * @note the surface may not be connected, eg. two spheres will yield a true
 * result
 * @ingroup detail
 */
SFCGAL_API bool
isClosed(const SurfaceGraph &graph);

} // namespace algorithm
} // namespace SFCGAL
#endif
