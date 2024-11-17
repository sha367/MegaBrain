// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_REGISTRY_H_
#define SFCGAL_REGISTRY_H_

#include "SFCGAL/config.h"

#include <map>
#include <string>
#include <vector>

namespace SFCGAL {
class Geometry;
}

namespace SFCGAL {
namespace tools {

/**
 * Registry for dynamic information about SFCGAL library
 */
class SFCGAL_API Registry {
public:
  typedef std::vector<Geometry *>::iterator       prototype_iterator;
  typedef std::vector<Geometry *>::const_iterator const_prototype_iterator;

  /**
   * destructor
   */
  ~Registry();

  /**
   * Register a new Geometry type
   */
  void
  addPrototype(const Geometry &g);

  /**
   * returns the list of the geometry types
   */
  std::vector<std::string>
  getGeometryTypes() const;

  /**
   * returns a new instance of the given geometryTypeName
   */
  Geometry *
  newGeometryByTypeName(const std::string &geometryTypeName) const;

  /**
   * returns a new instance of the given geometryType
   */
  Geometry *
  newGeometryByTypeId(int typeId) const;

  /**
   * returns the instance of the registry
   */
  static Registry &
  instance();

private:
  /**
   * static instance of the Singleton
   */
  static Registry *_instance;
  /**
   * prototypes of the geometries
   */
  std::vector<Geometry *> _prototypes;

  /**
   * init registry
   */
  Registry();
};

} // namespace tools
} // namespace SFCGAL

#endif
