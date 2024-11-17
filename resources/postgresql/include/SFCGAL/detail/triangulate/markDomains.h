// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_TRIANGULATE_DETAIL_MARKDOMAINS_H_
#define SFCGAL_TRIANGULATE_DETAIL_MARKDOMAINS_H_

namespace SFCGAL {
namespace triangulate {
namespace detail {

/**
 * @brief fill nestingLevel
 *
 * Adapted from CGAL-4.1/examples/Triangulation_2/polygon_triangulation.cpp
 */
template <typename CDT>
void
markDomains(CDT &cdt, typename CDT::Face_handle start, int index,
            std::list<typename CDT::Edge> &border)
{
  typedef typename CDT::Face_handle Face_handle;
  typedef typename CDT::Edge        Edge;

  if (start->info().nestingLevel != -1) {
    return;
  }

  std::list<Face_handle> queue;
  queue.push_back(start);

  while (!queue.empty()) {
    Face_handle fh = queue.front();
    queue.pop_front();

    if (fh->info().nestingLevel == -1) {
      fh->info().nestingLevel = index;

      for (int i = 0; i < 3; i++) {
        Edge        e(fh, i);
        Face_handle n = fh->neighbor(i);

        if (n->info().nestingLevel == -1) {
          if (cdt.is_constrained(e)) {
            border.push_back(e);
          } else {
            queue.push_back(n);
          }
        }
      }
    }
  }
}

/**
 * @brief fill nestingLevel
 *
 * Adapted from CGAL-4.1/examples/Triangulation_2/polygon_triangulation.cpp
 */
template <typename CDT>
void
markDomains(CDT &cdt)
{
  typedef typename CDT::All_faces_iterator All_faces_iterator;
  typedef typename CDT::Face_handle        Face_handle;
  typedef typename CDT::Edge               Edge;

  for (All_faces_iterator it = cdt.all_faces_begin(); it != cdt.all_faces_end();
       ++it) {
    it->info().nestingLevel = -1;
  }

  int             index = 0;
  std::list<Edge> border;
  markDomains(cdt, cdt.infinite_face(), index++, border);

  while (!border.empty()) {
    Edge e = border.front();
    border.pop_front();
    Face_handle n = e.first->neighbor(e.second);

    if (n->info().nestingLevel == -1) {
      markDomains(cdt, n, e.first->info().nestingLevel + 1, border);
    }
  }
}

} // namespace detail
} // namespace triangulate
} // namespace SFCGAL

#endif
