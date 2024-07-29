"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const thumbnailRoutes_1 = __importDefault(require("./routes/thumbnailRoutes"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static('uploads')); // Serve static files from 'uploads' directory
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
app.use('/api', userRoutes_1.default);
app.use('/api', eventRoutes_1.default);
app.use('/api', authRoutes_1.default);
app.use('/api', thumbnailRoutes_1.default);
dotenv_1.default.config();
const username = process.env.MONGODB_USERNAME || '';
const password = process.env.MONGODB_PASSWORD || '';
const uri = `mongodb+srv://${username}:${password}@event-management-dev.dw7pzcj.mongodb.net/?retryWrites=true&w=majority&appName=event-management-dev`;
const clientOptions = {
    serverApi: { version: '1', strict: true, deprecationErrors: true }
};
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(uri, clientOptions);
            console.log("Connected to MongoDB!");
            app.listen(port, () => {
                console.log(`Server running at http://localhost:${port}`);
            });
        }
        catch (error) {
            console.error("Error:", error);
            process.exit(1);
        }
    });
}
run().catch(console.error);
