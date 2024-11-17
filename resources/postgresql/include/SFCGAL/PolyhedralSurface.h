// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_POLYHEDRALSURFACE_H_
#define SFCGAL_POLYHEDRALSURFACE_H_

#include <boost/assert.hpp>
#include <boost/ptr_container/ptr_vector.hpp>
#include <boost/ptr_container/serialize_ptr_vector.hpp>
#include <boost/serialization/base_object.hpp>
#include <vector>

#include "SFCGAL/Kernel.h"
#include "SFCGAL/Point.h"
#include "SFCGAL/Polygon.h"
#include "SFCGAL/TriangulatedSurface.h"
#include "SFCGAL/triangulate/triangulatePolygon.h"

#include <CGAL/Polyhedron_3.h>
#include <CGAL/Surface_mesh.h>

using Mesh = CGAL::Surface_mesh<SFCGAL::Kernel::Point_3>;

namespace SFCGAL {

/**
 * A PolyhedralSurface in SFA modeled as a Polygon soup
 * @ingroup public_api
 * @todo do better than a "polygon soup" or add topological view?
 */
class SFCGAL_API PolyhedralSurface : public Surface {
public:
  typedef boost::ptr_vector<Polygon>::iterator       iterator;
  typedef boost::ptr_vector<Polygon>::const_iterator const_iterator;

  /**
   * Empty PolyhedralSurface constructor
   */
  PolyhedralSurface();
  /**
   * Constructor with a vector of polygons
   */
  PolyhedralSurface(const std::vector<Polygon> &polygons);

  /**
   * Constructor with a Geometry
   */
  PolyhedralSurface(const std::unique_ptr<Geometry> &geometry);

  /**
   * Constructor from a Polyhedron (detail::MarkedPolyhedron or
   * CGAL::Polyhedron_3)
   */
  template <typename Polyhedron>
  PolyhedralSurface(const Polyhedron &poly)
  {
    for (typename Polyhedron::Facet_const_iterator fit = poly.facets_begin();
         fit != poly.facets_end(); ++fit) {
      auto *face = new LineString();
      typename Polyhedron::Halfedge_around_facet_const_circulator hit =
          fit->facet_begin();
      do {
        face->addPoint(hit->vertex()->point());
        ++hit;
      } while (hit != fit->facet_begin());
      // close the ring
      face->addPoint(hit->vertex()->point());
      _polygons.push_back(new Polygon(face));
    }
  }

  /**
   * Constructor from a CGAL::Surface_mesh
   */
  PolyhedralSurface(const Mesh &sm);
  /**
   * Copy constructor
   */
  PolyhedralSurface(const PolyhedralSurface &other);
  /**
   * assign operator
   */
  PolyhedralSurface &
  operator=(PolyhedralSurface other);
  /**
   * destructor
   */
  ~PolyhedralSurface();

  //-- SFCGAL::Geometry
  virtual PolyhedralSurface *
  clone() const;

  //-- SFCGAL::Geometry
  virtual std::string
  geometryType() const;
  //-- SFCGAL::Geometry
  virtual GeometryType
  geometryTypeId() const;
  //-- SFCGAL::Geometry
  virtual int
  dimension() const;
  //-- SFCGAL::Geometry
  virtual int
  coordinateDimension() const;
  //-- SFCGAL::Geometry
  virtual bool
  isEmpty() const;
  //-- SFCGAL::Geometry
  virtual bool
  is3D() const;
  //-- SFCGAL::Geometry
  virtual bool
  isMeasured() const;

  /**
   * Convert PolyhedralSurface to TriangulatedSurface
   */
  TriangulatedSurface
  toTriangulatedSurface() const;

  /**
   * [SFA/OGC]Returns the number of points
   * @deprecated see numGeometries
   */
  inline size_t
  numPolygons() const
  {
    return _polygons.size();
  }
  /**
   * [SFA/OGC]Returns the n-th point
   * @deprecated see geometryN()
   */
  inline const Polygon &
  polygonN(size_t const &n) const
  {
    BOOST_ASSERT(n < _polygons.size());
    return _polygons[n];
  }
  /**
   * [SFA/OGC]Returns the n-th point
   * @deprecated see geometryN()
   */
  inline Polygon &
  polygonN(size_t const &n)
  {
    BOOST_ASSERT(n < _polygons.size());
    return _polygons[n];
  }
  /**
   * add a polygon to the PolyhedralSurface
   */
  void
  addPolygon(const Polygon &polygon);
  /**
   * add a polygon to the PolyhedralSurface
   */
  void
  addPolygon(Polygon *polygon);
  /**
   * add polygons from an other PolyhedralSurface
   */
  void
  addPolygons(const PolyhedralSurface &polyhedralSurface);

  //-- SFCGAL::Geometry
  virtual size_t
  numGeometries() const;
  //-- SFCGAL::Geometry
  virtual const Polygon &
  geometryN(size_t const &n) const;
  //-- SFCGAL::Geometry
  virtual Polygon &
  geometryN(size_t const &n);

  /**
   * Convert to CGAL::Polyhedron_3
   */
  template <typename K, typename Polyhedron>
  std::unique_ptr<Polyhedron>
  toPolyhedron_3() const
  {
    TriangulatedSurface tri;
    triangulate::triangulatePolygon3D(*this, tri);
    return tri.toPolyhedron_3<K, Polyhedron>();
  }

  //-- iterators

  inline iterator
  begin()
  {
    return _polygons.begin();
  }
  inline const_iterator
  begin() const
  {
    return _polygons.begin();
  }

  inline iterator
  end()
  {
    return _polygons.end();
  }
  inline const_iterator
  end() const
  {
    return _polygons.end();
  }

  //-- visitors

  //-- SFCGAL::Geometry
  virtual void
  accept(GeometryVisitor &visitor);
  //-- SFCGAL::Geometry
  virtual void
  accept(ConstGeometryVisitor &visitor) const;

  /**
   * Serializer
   */
  template <class Archive>
  void
  serialize(Archive &ar, const unsigned int /*version*/)
  {
    ar &boost::serialization::base_object<Geometry>(*this);
    ar &_polygons;
  }

private:
  boost::ptr_vector<Polygon> _polygons;

  void
  swap(PolyhedralSurface &other)
  {
    std::swap(_polygons, other._polygons);
  }
};
} // namespace SFCGAL

#endif
