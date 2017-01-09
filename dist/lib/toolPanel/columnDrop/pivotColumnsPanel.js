// ag-grid-enterprise v7.1.0
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var main_1 = require("ag-grid/main");
var abstractColumnDropPanel_1 = require("./abstractColumnDropPanel");
var svgFactory = main_1.SvgFactory.getInstance();
var PivotColumnsPanel = (function (_super) {
    __extends(PivotColumnsPanel, _super);
    function PivotColumnsPanel(horizontal) {
        _super.call(this, horizontal, false, 'pivot');
    }
    PivotColumnsPanel.prototype.passBeansUp = function () {
        _super.prototype.setBeans.call(this, {
            gridOptionsWrapper: this.gridOptionsWrapper,
            eventService: this.eventService,
            context: this.context,
            loggerFactory: this.loggerFactory,
            dragAndDropService: this.dragAndDropService
        });
        var localeTextFunc = this.gridOptionsWrapper.getLocaleTextFunc();
        var emptyMessage = localeTextFunc('pivotColumnsEmptyMessage', 'Drag here to set column labels');
        var title = localeTextFunc('pivots', 'Column Labels');
        _super.prototype.init.call(this, {
            dragAndDropIcon: main_1.DragAndDropService.ICON_GROUP,
            icon: main_1.Utils.createIconNoSpan('pivotPanel', this.gridOptionsWrapper, null, svgFactory.createPivotIcon),
            emptyMessage: emptyMessage,
            title: title
        });
        this.addDestroyableEventListener(this.eventService, main_1.Events.EVENT_COLUMN_EVERYTHING_CHANGED, this.refresh.bind(this));
        this.addDestroyableEventListener(this.eventService, main_1.Events.EVENT_COLUMN_PIVOT_CHANGED, this.refresh.bind(this));
        this.addDestroyableEventListener(this.eventService, main_1.Events.EVENT_COLUMN_PIVOT_MODE_CHANGED, this.checkVisibility.bind(this));
        this.refresh();
    };
    PivotColumnsPanel.prototype.refresh = function () {
        this.checkVisibility();
        this.refreshGui();
    };
    PivotColumnsPanel.prototype.checkVisibility = function () {
        var pivotMode = this.columnController.isPivotMode();
        if (this.isHorizontal()) {
            // what we do for horizontal (ie the pivot panel at the top) depends
            // on the user property as well as pivotMode.
            switch (this.gridOptionsWrapper.getPivotPanelShow()) {
                case 'always':
                    this.setVisible(pivotMode);
                    break;
                case 'onlyWhenPivoting':
                    var pivotActive = this.columnController.isPivotActive();
                    this.setVisible(pivotMode && pivotActive);
                    break;
                default:
                    // never show it
                    this.setVisible(false);
                    break;
            }
        }
        else {
            // in toolPanel, the pivot panel is always shown when pivot mode is on
            this.setVisible(pivotMode);
        }
    };
    PivotColumnsPanel.prototype.isColumnDroppable = function (column) {
        if (this.gridOptionsWrapper.isFunctionsReadOnly()) {
            return false;
        }
        // we never allow grouping of secondary columns
        if (!column.isPrimary()) {
            return false;
        }
        var allowPivot = column.isAllowPivot();
        var columnNotAlreadyPivoted = !column.isPivotActive();
        return allowPivot && columnNotAlreadyPivoted;
    };
    PivotColumnsPanel.prototype.updateColumns = function (columns) {
        if (this.gridOptionsWrapper.isFunctionsPassive()) {
            this.eventService.dispatchEvent(main_1.Events.EVENT_COLUMN_PIVOT_CHANGE_REQUEST, { columns: columns });
        }
        else {
            this.columnController.setPivotColumns(columns);
        }
    };
    PivotColumnsPanel.prototype.getIconName = function () {
        return this.isPotentialDndColumns() ? main_1.DragAndDropService.ICON_PIVOT : main_1.DragAndDropService.ICON_NOT_ALLOWED;
    };
    PivotColumnsPanel.prototype.getExistingColumns = function () {
        return this.columnController.getPivotColumns();
    };
    __decorate([
        main_1.Autowired('columnController'), 
        __metadata('design:type', main_1.ColumnController)
    ], PivotColumnsPanel.prototype, "columnController", void 0);
    __decorate([
        main_1.Autowired('eventService'), 
        __metadata('design:type', (typeof (_a = typeof main_1.EventService !== 'undefined' && main_1.EventService) === 'function' && _a) || Object)
    ], PivotColumnsPanel.prototype, "eventService", void 0);
    __decorate([
        main_1.Autowired('gridOptionsWrapper'), 
        __metadata('design:type', (typeof (_b = typeof main_1.GridOptionsWrapper !== 'undefined' && main_1.GridOptionsWrapper) === 'function' && _b) || Object)
    ], PivotColumnsPanel.prototype, "gridOptionsWrapper", void 0);
    __decorate([
        main_1.Autowired('context'), 
        __metadata('design:type', (typeof (_c = typeof main_1.Context !== 'undefined' && main_1.Context) === 'function' && _c) || Object)
    ], PivotColumnsPanel.prototype, "context", void 0);
    __decorate([
        main_1.Autowired('loggerFactory'), 
        __metadata('design:type', (typeof (_d = typeof main_1.LoggerFactory !== 'undefined' && main_1.LoggerFactory) === 'function' && _d) || Object)
    ], PivotColumnsPanel.prototype, "loggerFactory", void 0);
    __decorate([
        main_1.Autowired('dragAndDropService'), 
        __metadata('design:type', (typeof (_e = typeof main_1.DragAndDropService !== 'undefined' && main_1.DragAndDropService) === 'function' && _e) || Object)
    ], PivotColumnsPanel.prototype, "dragAndDropService", void 0);
    __decorate([
        main_1.PostConstruct, 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], PivotColumnsPanel.prototype, "passBeansUp", null);
    return PivotColumnsPanel;
    var _a, _b, _c, _d, _e;
}(abstractColumnDropPanel_1.AbstractColumnDropPanel));
exports.PivotColumnsPanel = PivotColumnsPanel;
