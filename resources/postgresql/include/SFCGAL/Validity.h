// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_VALIDITY_H_
#define SFCGAL_VALIDITY_H_

namespace SFCGAL {

/**
 * @brief the class, convertible to bool, that stores the reason why a geom is
 * invalid
 */
struct Validity {
  /**
   * @note the class has private ctor to force the use of functions valid() and
   * invalid(reason) that are clearer in the code than to remember that "Valid
   * constructed with a reason is invalid"
   */
  static const Validity
  valid()
  {
    return Validity();
  }
  static const Validity
  invalid(const std::string &reason)
  {
    return Validity(reason);
  }
  operator bool() const { return _valid; }
  const std::string &
  reason() const
  {
    return _reason;
  }

private:
  bool        _valid; // not const to allow default copy
  std::string _reason;
  /**
   * @brief default ctor for valid
   */
  Validity() : _valid(true) {}
  /**
   * @brief if we construct with a reason, the class is invalid
   */
  Validity(const std::string &reason) : _valid(false), _reason(reason) {}
};

} // namespace SFCGAL
#endif
