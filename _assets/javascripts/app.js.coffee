#= require vendor/jquery
#= require vendor/bootstrap
#= require vendor/jquery/jQuery.headroom

# Some general UI pack related JS
$(document).ready ->
  # Move some elements around when viewing from a "mobile" container
  updateContainer()
  $(window).resize ->
    updateContainer()

  # Disable link click not scroll top
  $("a[href='#']").click ->
    false

  $("#navbar").headroom({
    offset : 0,
    tolerance : 10,
    classes : {
      initial : "headroom",
      pinned : "headroom--pinned",
      unpinned : "headroom--unpinned"
    }
    })

updateContainer = ->
  $containerWidth = $(window).width()
  if $containerWidth <= 767
    swapPlaces ".post-meta", ".post-container"
    moveDatetime true
  else
    swapPlaces ".post-container", ".post-meta"
    moveDatetime false

swapPlaces = (currentlyBefore, currentlyAfter) ->
  $(currentlyBefore).each ->
    $sibling = $(this).siblings(currentlyAfter)
    $(this).insertAfter $sibling

moveDatetime = (underTitle) ->
  if underTitle is true
    $(".date-time").each ->
      $title = $(this).closest(".row-fluid").find(".link")
      $(this).insertAfter $title
  else
    $(".date-time").each ->
      $firstItemInPostMeta = $(this).closest(".row-fluid").find(".post-meta").children().first()
      $(this).insertBefore $firstItemInPostMeta
