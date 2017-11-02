/**
 * Created by lcz on 2017/11/1.
 */
import XLSX from 'xlsx';

class WorkBook {
    /**
     * @param wkData {Object} Excel表格源数据，格式如下：
     */
    constructor(wkData) {
        this.workbook = {};
        this.workbook.SheetNames = [];
        this.workbook.Sheets = {};

        wkData.forEach(wk => {
            this.workbook.SheetNames.push(wk.name);
            this.workbook.Sheets[wk.name] = XLSX.utils.aoa_to_sheet(wk.data);
        });
    }

    /**
     * 将数据写入Excel
     * @param {string} filename 文件路径
     */
    writeFile(filename) {
        XLSX.writeFile(this.workbook, filename);
    }
}

export default WorkBook;