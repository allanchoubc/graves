
module API
  class CollectionsController < ApplicationController

    def index

      @collections = Collection
        .with_tag_list
        .includes(:notice)
        .as_geojson(
          :num_graves,
          :location,
          :destination,
          :province_p,
          :province_c,
          :county_p,
          :county_c,
          :town_p,
          :town_c,
          :tag_list,
          :notice,
        )

      respond_to do |format|
        format.json
        format.csv { render text: Collection.to_csv }
      end
    end

  end
end
