var parseItem = function (item) {
  var estimate = {
    original: 0,
    remaining: 0
  };

  item.find('[data-tooltip*="Original Estimate: "]').each(function () {
    var rawText = jQuery(this).attr('data-tooltip');
    var dataText = rawText.split(': ')[1];
    console.log(dataText);
    estimate.original += parseFloat(dataText) || 0;
  });

  item.find('[data-tooltip*="Remaining Estimate: "]').each(function () {
    var rawText = jQuery(this).attr('data-tooltip');
    var dataText = rawText.split(': ')[1];
    console.log(dataText);
    estimate.remaining += parseFloat(dataText) || 0;
  });
  return estimate;
};

var updateTime = function () {
  jQuery('#ghx-column-headers>li').each(function () {
    var colId = jQuery(this).attr('data-id');
    var col = jQuery('[data-column-id="' + colId + '"]');

    estimate = parseItem(col);
    console.log(estimate);
    var estimateDiv = jQuery('<div></div>');
    estimateDiv.append('<span><b> O: </b>' + estimate.original + 'h </span>');
    estimateDiv.append('<span><b> R: </b>' + estimate.remaining + 'h </span>');
    estimateDiv.appendTo(jQuery(this));
  });
};

jQuery().ready(function () {
  if (GH) {
    updateTime();
    AJS.$(GH).bind('workModeUIReady', function () {
      console.log('UPDATED');
      updateTime();
    });
  }
});