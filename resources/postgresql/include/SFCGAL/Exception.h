// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_EXCEPTION_H_
#define SFCGAL_EXCEPTION_H_

#include "SFCGAL/config.h"
#include <boost/exception/all.hpp>
#include <boost/format.hpp>
#include <string>

namespace SFCGAL {

/**
 * Base SFCGAL Exception
 *
 * \code
 * BOOST_THROW_EXCEPTION( Exception("invalid geometry") );
 * \endcode
 */
class SFCGAL_API Exception : public virtual boost::exception,
                             public virtual std::exception {
public:
  Exception() noexcept;
  explicit Exception(std::string const &message) noexcept;
  Exception(const Exception &) noexcept = default;
  Exception &
  operator=(const Exception &) noexcept = default;
  Exception(Exception &&) noexcept      = default;
  Exception &
  operator=(Exception &&) noexcept = default;
  ~Exception() noexcept override;

  /**
   * returns the exception message
   */
  const char *
  what() const noexcept override;

  /**
   * returns diagnostic information (file, line, etc.)
   */
  std::string
  diagnostic() const noexcept;

protected:
  std::string _message;
};

/**
 * SFCGAL Exception thrown when invalid geometries are found before entering an
 * algo
 */
class SFCGAL_API GeometryInvalidityException : public Exception {
public:
  explicit GeometryInvalidityException(std::string const &message) noexcept;
  GeometryInvalidityException(const GeometryInvalidityException &) noexcept =
      default;
  GeometryInvalidityException &
  operator=(const GeometryInvalidityException &) noexcept = default;
  GeometryInvalidityException(GeometryInvalidityException &&) noexcept =
      default;
  GeometryInvalidityException &
  operator=(GeometryInvalidityException &&) noexcept = default;
  ~GeometryInvalidityException() noexcept override;
};

/**
 * SFCGAL Exception thrown when a function is not implemented
 */
class SFCGAL_API NotImplementedException : public Exception {
public:
  explicit NotImplementedException(std::string const &message) noexcept;
  NotImplementedException(const NotImplementedException &) noexcept = default;
  NotImplementedException &
  operator=(const NotImplementedException &) noexcept          = default;
  NotImplementedException(NotImplementedException &&) noexcept = default;
  NotImplementedException &
  operator=(NotImplementedException &&) noexcept = default;
  ~NotImplementedException() noexcept override;
};

/**
 * SFCGAL Exception thrown when geometry is inappropriate for a function
 */
class SFCGAL_API InappropriateGeometryException : public Exception {
public:
  explicit InappropriateGeometryException(std::string const &message) noexcept;
  InappropriateGeometryException(
      const InappropriateGeometryException &) noexcept = default;
  InappropriateGeometryException &
  operator=(const InappropriateGeometryException &) noexcept = default;
  InappropriateGeometryException(InappropriateGeometryException &&) noexcept =
      default;
  InappropriateGeometryException &
  operator=(InappropriateGeometryException &&) noexcept = default;
  ~InappropriateGeometryException() noexcept override;
};

/**
 * SFCGAL Exception thrown when non finite value is found
 */
class SFCGAL_API NonFiniteValueException : public Exception {
public:
  explicit NonFiniteValueException(std::string const &message) noexcept;
  NonFiniteValueException(const NonFiniteValueException &) noexcept = default;
  NonFiniteValueException &
  operator=(const NonFiniteValueException &) noexcept          = default;
  NonFiniteValueException(NonFiniteValueException &&) noexcept = default;
  NonFiniteValueException &
  operator=(NonFiniteValueException &&) noexcept = default;
  ~NonFiniteValueException() noexcept override;
};

/**
 * SFCGAL Exception thrown when parsing WKT
 */
class SFCGAL_API WktParseException : public Exception {
public:
  explicit WktParseException(std::string const &message) noexcept;
  WktParseException(const WktParseException &) noexcept = default;
  WktParseException &
  operator=(const WktParseException &) noexcept    = default;
  WktParseException(WktParseException &&) noexcept = default;
  WktParseException &
  operator=(WktParseException &&) noexcept = default;
  ~WktParseException() noexcept override;
};

} // namespace SFCGAL

#endif // SFCGAL_EXCEPTION_H_
