/**
 * Created by khalilmouakher on 05/04/2016.
 */
/**
 *
 * Parse and save datas
 * @param datas
 * @returns {{}}
 */
function parseDatas(datas){
    var distancesMap = {};
    inputLineArray = datas.split("\n");
    inputLineArray.forEach(function(line) {
        lineDataArray = line.split(new RegExp(" to | = ", "g"));
        saveDatas(distancesMap, $.trim(lineDataArray[0]), $.trim(lineDataArray[1]), parseInt($.trim(lineDataArray[2])));
        saveDatas(distancesMap, $.trim(lineDataArray[1]), $.trim(lineDataArray[0]), parseInt($.trim(lineDataArray[2])));
    });
    return distancesMap;
};

function saveDatas(distanceMap, from, to, distance){
    distanceOfCurrent = (from in distanceMap) ? distanceMap[from] : {};
    distanceOfCurrent[to] = distance;
    distanceMap[from] = distanceOfCurrent;
};

/**
 * calculate shortest paths when start from each location
 */
function calculateShortestPaths(distancesArray){
    var pathArray = [];
    $.each(distancesArray, function(from, destMap) {
        var currentPath = [];
        var totalDistance = 0;
        currentPath.push(from);
        selectDestination(distancesArray, currentPath, from, totalDistance);
        pathArray.push(currentPath);
    });
    return pathArray;
}

/**
 * Select next nearest destination
 * @param distancesArray
 * @param currentPath
 * @param from
 * @param totalDistance
 */
function selectDestination(distancesArray, currentPath, from, totalDistance){
    var minDistance = 0;
    var selectedDestination = null;
    if (from!=null){
        $.each(distancesArray[from], function(destination, distance) {
            // if destination is nearest and is never visited
            if ((jQuery.inArray(destination, currentPath) == -1) &&  ((distance < minDistance) || minDistance == 0)){
                selectedDestination = destination;
                minDistance = distance;
            }
        });
        (selectedDestination==null) ? currentPath.push(totalDistance) : currentPath.push(selectedDestination);
        totalDistance += (selectedDestination==null) ?  0: minDistance;

        // select next nearest Destination
        selectDestination(distancesArray, currentPath, selectedDestination, totalDistance)
    }

}