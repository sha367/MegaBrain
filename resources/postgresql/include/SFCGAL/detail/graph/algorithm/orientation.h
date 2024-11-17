// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_GRAPH_ALGORITHM_MAKECONSISTENTORIENTATION_H_
#define SFCGAL_GRAPH_ALGORITHM_MAKECONSISTENTORIENTATION_H_

#include "SFCGAL/detail/graph/GeometryGraph.h"
#include <map>

namespace SFCGAL {
namespace graph {
namespace algorithm {

/**
 * @brief [private]Study orientation between two EdgeStrings
 * @return true on success
 */
template <typename Graph>
void
studyOrientation(Graph                                        &graph,
                 std::vector<typename Graph::edge_descriptor> &reference,
                 std::vector<typename Graph::edge_descriptor> &target,
                 bool &hasOppositeEdge, bool &hasParallelEdge)
{
  /*
   * look for opposite or parallel edges in reference and target
   */
  hasOppositeEdge = false;
  hasParallelEdge = false;

  for (size_t i = 0; i < reference.size(); i++) {
    for (size_t j = 0; j < target.size(); j++) {
      if (graph.areOpposite(reference[i], target[j])) {
        hasOppositeEdge = true;
      }

      if (graph.areParallel(reference[i], target[j])) {
        hasParallelEdge = true;
      }
    }
  }
}

/**
 * Try to build consistent orientation between two edge string
 * @return true on success
 */
template <typename Graph>
bool
makeConsistentOrientation(
    Graph &graph, std::vector<typename Graph::edge_descriptor> &reference,
    std::vector<typename Graph::edge_descriptor> &target)
{
  /*
   * look for opposite or parallel edges in "reference" and "target" edge sets
   */
  bool hasOppositeEdge, hasParallelEdge;
  studyOrientation(graph, reference, target, hasOppositeEdge, hasParallelEdge);

  /*
   * if both opposite and parallel edge are found, there is no possible
   * consistent orientation
   */
  if (hasOppositeEdge && hasParallelEdge) {
    BOOST_THROW_EXCEPTION(
        Exception("can't make consistent orientation between EdgeStrings (both "
                  "opposite and parallel edge found)"));
  }

  /*
   * Only parallel edge found, lets revert the orientation of the "target" edge
   * set
   */
  if (hasParallelEdge) {
    graph.reverse(target);
    return true;
  } else {
    return false;
  }
}

} // namespace algorithm
} // namespace graph
} // namespace SFCGAL

#endif
