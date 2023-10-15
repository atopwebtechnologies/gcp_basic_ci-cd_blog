"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogRoutes_1 = __importDefault(require("./api/routers/blogRoutes"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use('/api/v1/blogs', blogRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
exports.default = app;
