
module Helpers::Geo

  #
  # Alias the cartesian geometry factory.
  #
  # @return [RGeo::Geos::CAPIFactory]
  #
  def self.factory
    RGeo::Geographic.simple_mercator_factory()
  end

  #
  # Create a point geometry.
  #
  # @param x [Float]
  # @param y [Float]
  # @return [RGeo::Geos::CAPIPointImpl]
  #
  def self.point(x, y)
    factory.point(x, y)
  end

  #
  # Create a polygon from an (unclosed) set of points.
  #
  def self.polygon(*coords)

    # Close the point set.
    coords << coords[0]

    # Because of a bug in RGeo, we have to pass a LINESTRING to the polygon
    # factory, instead of just an array of points.
    factory.polygon(factory.line_string(
      coords.map do |c|
        point(*c)
      end
    ))

  end

end
