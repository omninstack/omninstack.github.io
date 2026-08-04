# Key Technologies

## Dataset Creation & RAG

Core technical foundation: building curated datasets and a Retrieval-Augmented Generation (RAG) pipeline that grounds AI responses in enterprise-owned data, without leaking data to the public internet.

### Data Sources

| Source | What it feeds | Consuming stage |
| --- | --- | --- |
| **SNS (social media)** | Posts, comments, mentions, DMs — brand sentiment, trending topics, and user-generated content signals. | Data Ingestion & Chunking |
| **User inputs** | Chat messages, support tickets, form submissions, feedback — first-party conversational data. | Data Ingestion & Chunking |
| **Sales catalogs** | Product listings, pricing, inventory, promotions — structured commerce data. | Data Ingestion & Chunking |

### RAG Pipeline

| Stage | Description |
| --- | --- |
| **Data Ingestion & Chunking** | Normalize source data and split it into semantically coherent chunks. |
| **Embedding Generation** | Convert chunks into vector embeddings using on-prem or sovereign embedding models. |
| **Vector Database** | Store and index embeddings (e.g., pgvector, Qdrant) for fast semantic search. |
| **Retrieval** | Fetch the most relevant chunks for a given query via similarity search. |
| **Augmentation & Generation** | Inject retrieved context into the LLM prompt and generate a grounded, citation-backed response. |

## Products / Service Platforms

Both platforms are built on the shared dataset + RAG foundation above:

- **Convergo** — Customer Engagement platform. Uses SNS and user-input data for sentiment-aware messaging, and sales-catalog data for natural-language product/catalog search and AI-assisted copy generation.
- **Contexa** — Trust & Safety platform. Uses SNS and user-input data (posts, chats, reports) as the primary moderation surface, with RAG for context-aware policy retrieval and explainable moderation decisions.
