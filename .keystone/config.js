"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core2 = require("@keystone-6/core");

// schema.ts
var import_core = require("@keystone-6/core");
var import_fields = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");
function isUser({ session: session2 }) {
  return session2?.data?.name !== void 0;
}
var lists = {
  User: (0, import_core.list)({
    access: {
      operation: {
        create: isUser,
        delete: isUser,
        update: isUser,
        query: ({ session: session2, context, listKey, operation }) => true
      }
    },
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      password: (0, import_fields.password)({ validation: { isRequired: true } }),
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      })
    }
  }),
  Project: (0, import_core.list)({
    access: {
      operation: {
        create: isUser,
        delete: isUser,
        update: isUser,
        query: ({ session: session2, context, listKey, operation }) => true
      }
    },
    fields: {
      title: (0, import_fields.text)({ validation: { isRequired: true } }),
      content: (0, import_fields_document.document)({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1]
        ],
        links: true,
        dividers: true
      }),
      tags: (0, import_fields.relationship)({
        ref: "Tag.projects",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: ["name"],
          inlineEdit: { fields: ["name"] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ["name"] }
        }
      }),
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      })
    }
  }),
  Cutting: (0, import_core.list)({
    access: {
      operation: {
        create: isUser,
        delete: isUser,
        update: isUser,
        query: ({ session: session2, context, listKey, operation }) => true
      }
    },
    fields: {
      content: (0, import_fields_document.document)({
        layouts: [
          [1]
        ]
      }),
      images: (0, import_fields.relationship)({
        ref: "Image.cuttings",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: ["description", "image"],
          inlineEdit: { fields: ["description", "image"] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ["description", "image"] }
        }
      }),
      tags: (0, import_fields.relationship)({
        ref: "Tag.cuttings",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: ["name"],
          inlineEdit: { fields: ["name"] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ["name"] }
        }
      }),
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      })
    }
  }),
  Image: (0, import_core.list)({
    access: {
      operation: {
        create: isUser,
        delete: isUser,
        update: isUser,
        query: ({ session: session2, context, listKey, operation }) => true
      }
    },
    fields: {
      description: (0, import_fields.text)(),
      image: (0, import_fields.image)({ storage: "default" }),
      cuttings: (0, import_fields.relationship)({ ref: "Cutting.images", many: true }),
      tags: (0, import_fields.relationship)({ ref: "Tag.images", many: true })
    }
  }),
  Tag: (0, import_core.list)({
    access: {
      operation: {
        create: isUser,
        delete: isUser,
        update: isUser,
        query: ({ session: session2, context, listKey, operation }) => true
      }
    },
    ui: {
      isHidden: true
    },
    fields: {
      name: (0, import_fields.text)(),
      projects: (0, import_fields.relationship)({ ref: "Project.tags", many: true }),
      cuttings: (0, import_fields.relationship)({ ref: "Cutting.tags", many: true }),
      images: (0, import_fields.relationship)({ ref: "Image.tags", many: true })
    }
  })
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (sessionSecret === void 0) {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: "name createdAt",
  secretField: "password",
  // remove after first deploy
  initFirstItem: {
    fields: ["name", "email", "password"]
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var keystone_default = withAuth(
  (0, import_core2.config)({
    db: {
      provider: process.env.KS_DB_PROVIDER ?? "sqlite",
      url: process.env.KS_DB_URL ?? "file:./keystone.db",
      useMigrations: true
    },
    lists,
    session,
    storage: {
      default: process.env.KS_S3_BUCKET_NAME !== void 0 ? {
        kind: "s3",
        type: "image",
        bucketName: process.env.KS_S3_BUCKET_NAME ?? "",
        region: process.env.KS_S3_S3_REGION ?? "",
        accessKeyId: process.env.KS_S3_ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.KS_S3_SECRET_ACCESS_KEY ?? ""
      } : {
        kind: "local",
        type: "image",
        storagePath: "public",
        generateUrl: (path) => `http://localhost:3000/public/${path}`,
        serverRoute: null
      }
    }
  })
);
