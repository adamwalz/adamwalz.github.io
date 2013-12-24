require './_plugins/titlecase.rb'

module OctopressLiquidFilters
  # Returns a title cased string based on John Gruber's title case http://daringfireball.net/2008/08/title_case_update
  def titlecase(input)
    input.titlecase
  end
end

Liquid::Template.register_filter OctopressLiquidFilters
