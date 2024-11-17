// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_TRIANGULATE_CONSTRAINTDELAUNAYTRIANGULATION_H_
#define SFCGAL_TRIANGULATE_CONSTRAINTDELAUNAYTRIANGULATION_H_

#include <boost/optional.hpp>

#include "SFCGAL/Coordinate.h"
#include "SFCGAL/config.h"

#include <CGAL/Constrained_Delaunay_triangulation_2.h>
#include <CGAL/Triangulation_face_base_with_info_2.h>
#include <CGAL/Triangulation_vertex_base_with_info_2.h>

namespace SFCGAL {
class TriangulatedSurface;
}

namespace SFCGAL {
namespace triangulate {

/**
 * @brief 2DZ constraint Delaunay triangulation
 */
class SFCGAL_API ConstraintDelaunayTriangulation {
public:
  /**
   * @brief vertex info in triangulation
   */
  struct VertexInfo {
    VertexInfo() : original() {}
    Coordinate original;
  };

  /**
   * face information (depth)
   */
  struct FaceInfo {
    FaceInfo() : nestingLevel(-1) {}
    int nestingLevel;

    bool
    in_domain()
    {
      return nestingLevel % 2 == 1;
    }
  };

  typedef CGAL::Triangulation_vertex_base_with_info_2<VertexInfo, Kernel>
      Triangulation_vertex_base;
  typedef CGAL::Triangulation_face_base_with_info_2<FaceInfo, Kernel>
      Triangulation_face_base;
  typedef CGAL::Constrained_triangulation_face_base_2<Kernel,
                                                      Triangulation_face_base>
      Constrained_triangulation_face_base;
  typedef CGAL::Triangulation_data_structure_2<
      Triangulation_vertex_base, Constrained_triangulation_face_base>
      Triangulation_data_structure;

  typedef CGAL::Constrained_Delaunay_triangulation_2<
      Kernel, Triangulation_data_structure, CGAL::Exact_predicates_tag>
      CDT;

  typedef CDT::Vertex_handle         Vertex_handle;
  typedef CDT::Face_handle           Face_handle;
  typedef CDT::All_faces_iterator    All_faces_iterator;
  typedef CDT::Finite_faces_iterator Finite_faces_iterator;

  /**
   * @brief default constructor
   */
  ConstraintDelaunayTriangulation();

  /**
   * @brief add a vertex to the triangulation
   */
  Vertex_handle
  addVertex(const Coordinate &position);
  /**
   * @brief add a vertex to the triangulation
   */
  void
  addConstraint(Vertex_handle source, Vertex_handle target);

  /**
   * @brief clear the triangulation
   */
  void
  clear();

  /**
   * @brief Returns the number of finite vertices.
   */
  size_t
  numVertices() const;
  /**
   * @brief Returns the number of finite faces.
   */
  size_t
  numTriangles() const;

  /**
   * @brief test if a projection plane is defined
   */
  inline bool
  hasProjectionPlane() const
  {
    return _projectionPlane.is_initialized();
  }
  /**
   * @brief define projection plane
   */
  void
  setProjectionPlane(const Kernel::Plane_3 &projectionPlane);
  /**
   * @brief get the projection plane (OXY if not defined)
   */
  Kernel::Plane_3
  projectionPlane() const;

  /**
   * @brief test if the vertex is infinite
   */
  inline bool
  isInfinite(Vertex_handle vertex) const
  {
    return _cdt.is_infinite(vertex);
  }
  /**
   * @brief test if the face has infinite vertex
   */
  inline bool
  isInfinite(Face_handle face) const
  {
    return _cdt.is_infinite(face);
  }

  /**
   * @brief Append Triangles to a TriangulatedSurface
   */
  void
  getTriangles(TriangulatedSurface &triangulatedSurface,
               bool                 filterExteriorParts = false) const;
  /**
   * get the resulting TriangulatedSurface
   */
  std::unique_ptr<TriangulatedSurface>
  getTriangulatedSurface() const;

  /**
   * @brief get finite face iterator
   */
  inline Finite_faces_iterator
  finite_faces_begin() const
  {
    return _cdt.finite_faces_begin();
  }
  /**
   * @brief get finite face iterator
   */
  inline Finite_faces_iterator
  finite_faces_end() const
  {
    return _cdt.finite_faces_end();
  }

  /**
   * @brief get all face iterator
   */
  inline All_faces_iterator
  all_faces_begin() const
  {
    return _cdt.all_faces_begin();
  }
  /**
   * @brief get all face iterator
   */
  inline All_faces_iterator
  all_faces_end() const
  {
    return _cdt.all_faces_end();
  }

  /**
   * @brief fill nesting_level info in face info
   */
  void
  markDomains();

  /**
   * @brief [advanced]get the CGAL object
   */
  inline CDT &
  cdt()
  {
    return _cdt;
  }
  /**
   * @brief [advanced]get the CGAL object
   */
  inline const CDT &
  cdt() const
  {
    return _cdt;
  }

private:
  /**
   * @brief wrapped triangulation
   */
  CDT _cdt;
  /**
   * @brief plan in which the triangulation is done
   */
  boost::optional<Kernel::Plane_3> _projectionPlane;
};

} // namespace triangulate
} // namespace SFCGAL

#endif
