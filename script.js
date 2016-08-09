    var timestamps = [];
    
    var KeyTime = function (){
        var keyPressed, keyDown, keyUp;
    }
    
    $( "#target" ).keydown(function( event ) {
        key_time = new KeyTime;
        key_time.keyCode = event.keyCode;
        key_time.keyValue = String.fromCharCode(event.keyCode);
        key_time.keyDown = new Date().getTime();
        onKeyUp(key_time);
        console.log(timestamps);
    });

    $("#clear").click(function (event) {
        console.clear();
    });

    $("#to_csv").click(function (event) {
        downloadCSV({ filename: "timestamps-data.csv" });
    });
    

    function onKeyUp(key) {
        $( "#target" ).keyup(function( event ) {
            if(key.keyCode == event.keyCode){
                if (key.keyUp == undefined) {
                    key.keyUp = new Date().getTime();
                    timestamps.push(key);
                }
            }
        });
     }


function convertArrayOfObjectsToCSV(args) {  
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
            ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
}

function downloadCSV(args) {  
        var data, filename, link;
        var csv = convertArrayOfObjectsToCSV({
            data: timestamps
        });
        if (csv == null) return;

        filename = args.filename || 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
}