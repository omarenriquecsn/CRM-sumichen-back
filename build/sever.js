'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const indexRoutes_1 = __importDefault(require('./routes/indexRoutes'));
const cors_1 = __importDefault(require('cors'));
const morgan_1 = __importDefault(require('morgan'));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(indexRoutes_1.default);
exports.default = app;
