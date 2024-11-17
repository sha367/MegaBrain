// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_NUMERIC_H_
#define SFCGAL_NUMERIC_H_

#include <cmath>
#include <limits>

#include "SFCGAL/export.h"

#include "SFCGAL/Kernel.h"

namespace SFCGAL {

#if defined(__clang__)
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wfloat-equal"
#elif defined(__GCC__)
#pragma gcc diagnostic push
#pragma gcc diagnostic ignored "-Wfloat-equal"
#endif
inline auto
almostEqual(const double a, const double b, const double epsilon) -> bool
{
  // shortcut and handles inf values
  if (a == b) {
    return true;
  }

  if (std::isnan(a) || std::isnan(b)) {
    return std::isnan(a) && std::isnan(b);
  }

  const double absA = std::fabs(a);
  const double absB = std::fabs(b);
  const double diff = std::fabs(a - b);
  // fixed epsilon
  if (diff <= epsilon) {
    return true;
  }

  return diff <= epsilon * std::max(absA, absB); // adaptative epsilon
}

inline auto
almostEqual(const Kernel::FT &a, const Kernel::FT &b, const Kernel::FT &epsilon)
    -> bool
{
  // shortcut and handles inf values
  if (a == b) {
    return true;
  }

  const Kernel::FT absA = abs(a);
  const Kernel::FT absB = abs(b);
  const Kernel::FT diff = abs(a - b);
  // fixed epsilon
  if (diff <= epsilon) {
    return true;
  }

  return diff <= epsilon * std::max(absA, absB); // adaptative epsilon
}

#if defined(__clang__)
#pragma clang diagnostic pop
#elif defined(__GCC__)
#pragma gcc diagnostic pop
#endif

/**
 * shortcut to get NaN for double
 */
inline double
NaN()
{
  return std::numeric_limits<double>::quiet_NaN();
}

/**
 * @brief round a double to the nearest integer
 */
inline double
round(const double &v)
{
  if (v < 0.0) {
    return ::ceil(v - 0.5);
  } else {
    return ::floor(v + 0.5);
  }
}

#ifdef CGAL_USE_GMPXX
/**
 * @brief floor a rational to an integer
 */
SFCGAL_API ::mpz_class
floor(const ::mpq_class &v);
/**
 * @brief ceil a rational to an integer
 */
SFCGAL_API ::mpz_class
ceil(const ::mpq_class &v);
/**
 * @brief round a rational to an integer
 */
SFCGAL_API ::mpz_class
round(const ::mpq_class &v);
#endif

/**
 * @brief floor a rational to an integer
 */
SFCGAL_API CGAL::Gmpz
           floor(const CGAL::Gmpq &v);
/**
 * @brief ceil a rational to an integer
 */
SFCGAL_API CGAL::Gmpz
           ceil(const CGAL::Gmpq &v);
/**
 * @brief round a rational to an integer
 */
SFCGAL_API CGAL::Gmpz
           round(const CGAL::Gmpq &v);

/**
 * @brief Normalizes a vector
 * @param v The vector to normalize
 * @return The normalized vector
 */
inline Kernel::Vector_3
normalizeVector(const Kernel::Vector_3 &vec)
{
  Kernel::FT length = CGAL::sqrt(CGAL::to_double(vec.squared_length()));
  return (length > 0) ? vec / length : vec;
}
} // namespace SFCGAL

#endif
