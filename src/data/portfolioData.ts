import visionImage from '../assets/images/ml_vision_inspection_1794547191140.jpg';
import ragImage from '../assets/images/ml_rag_architecture_1794547191309.jpg';
import edgeImage from '../assets/images/ml_edge_accelerator_1794547191906.jpg';
import forecastImage from '../assets/images/ml_forecast_model_1794547191074.jpg';
import portraitImage from '../assets/images/thrimurthi_engineer_portrait_1794547628748.jpg';
import type {
  MLProject,
  ProfileLinks,
  ResearchPaper,
  SkillGroup,
} from '../types/portfolio';

export const DEFAULT_PROFILE: ProfileLinks = {
  name: 'Thrimurthi',
  fullName: 'Ch. Thrimurthi',
  headline:
    'Designing reproducible machine learning systems across computer vision, citation-grounded retrieval, and quantized edge inference.',
  email: 'choparathrimurthi@gmail.com',
  githubUrl: 'https://github.com/thrimurthi-chopara',
  linkedinUrl: 'https://www.linkedin.com/in/thrimurthi-chopara',
  photoUrl: portraitImage,
  locationOrProgram: 'AI & Machine Learning Engineer · Applied AI Research',
};

export const HERO_METRICS = [
  { value: '04', label: 'End-to-End ML Systems' },
  { value: '03', label: 'Research Contributions' },
  { value: '94.2%', label: 'Peak Defect Macro-F1' },
  { value: '18.4 ms', label: 'Edge TensorRT Latency' },
];

export const ML_PROJECTS: MLProject[] = [
  {
    id: 'vision-defect-vit',
    title: 'VisionDefect ViT',
    category: 'Computer Vision',
    year: '2026',
    role: 'Lead ML Engineer',
    headlineMetric: '94.2% Macro-F1',
    headlineContext: '18.4 ms TensorRT FP16 inference on 1024px wafer scans',
    summary:
      'Automated semiconductor wafer and PCB micro-defect detection combining a Swin-Tiny backbone with contrastive anomaly pretraining and class-balanced focal loss.',
    problemStatement:
      'Manual optical inspection misses sub-millimeter hairline fractures under varying specular illumination, while naive CNN classifiers fail on rare defect classes with severe 1:45 class imbalance.',
    architectureSummary:
      'Pretrained a multi-scale Swin Transformer encoder via self-supervised SimCLR on 68,000 unlabeled inspection crops, then fine-tuned a patch-level defect segmentation and classification head exported to ONNX and TensorRT FP16.',
    stack: ['PyTorch', 'Swin Transformer', 'TensorRT', 'ONNX Runtime', 'OpenCV'],
    imageUrl: visionImage,
    imageAlt:
      'Automated optical inspection rig scanning a semiconductor wafer under structured blue illumination',
    featured: true,
    repoPath: 'vision-defect-vit',
    benchmarks: [
      {
        model: 'ResNet-50 Baseline',
        dataset: 'WM-811K + Lab PCB',
        primaryMetricLabel: 'Macro-F1',
        primaryMetricValue: '86.4%',
        latencyOrSize: '29.8 ms',
      },
      {
        model: 'YOLOv8-L Detector',
        dataset: 'WM-811K + Lab PCB',
        primaryMetricLabel: 'Macro-F1',
        primaryMetricValue: '90.1%',
        latencyOrSize: '22.1 ms',
      },
      {
        model: 'VisionDefect ViT (Ours)',
        dataset: 'WM-811K + Lab PCB',
        primaryMetricLabel: 'Macro-F1',
        primaryMetricValue: '94.2%',
        latencyOrSize: '18.4 ms',
        isOurs: true,
      },
    ],
    takeaways: [
      'Self-supervised contrastive pretraining raised rare-class recall by +7.8 points compared to ImageNet initialization.',
      'Dynamic patch tiling preserved 12-micron hairline cracks without blowing up GPU memory during training.',
      'FP16 TensorRT calibration achieved 54 FPS throughput with less than 0.2% F1 degradation.',
    ],
  },
  {
    id: 'citegraph-rag',
    title: 'CiteGraph RAG',
    category: 'NLP & LLMs',
    year: '2026',
    role: 'AI Systems Architect',
    headlineMetric: '3.1% Hallucination',
    headlineContext: 'Reduced from 19.4% baseline across 1,200 multi-hop queries',
    summary:
      'Citation-grounded hybrid retrieval system pairing dense BGE embeddings, BM25 sparse search, and entity-anchored knowledge graph traversal for verifiable technical QA.',
    problemStatement:
      'Standard vector-only RAG pipelines retrieve fragmented chunks that break cross-document reasoning, producing plausible-sounding citations that do not support the generated claim.',
    architectureSummary:
      'Built a dual-index retriever merging FAISS HNSW vectors with an entity-relation graph extracted via spaCy and structured prompts, followed by Reciprocal Rank Fusion, cross-encoder reranking, and sentence-level NLI claim verification.',
    stack: ['Python', 'FAISS', 'BGE-M3', 'Cross-Encoder', 'FastAPI'],
    imageUrl: ragImage,
    imageAlt:
      'Isometric rendering of interconnected semantic vector clusters and knowledge graph nodes',
    repoPath: 'citegraph-rag',
    benchmarks: [
      {
        model: 'Dense-Only RAG (Top-5)',
        dataset: 'SciMultiHop-1.2K',
        primaryMetricLabel: 'Faithfulness',
        primaryMetricValue: '80.6%',
        latencyOrSize: '410 ms',
      },
      {
        model: 'Hybrid BM25 + Dense',
        dataset: 'SciMultiHop-1.2K',
        primaryMetricLabel: 'Faithfulness',
        primaryMetricValue: '89.2%',
        latencyOrSize: '520 ms',
      },
      {
        model: 'CiteGraph RAG (Ours)',
        dataset: 'SciMultiHop-1.2K',
        primaryMetricLabel: 'Faithfulness',
        primaryMetricValue: '96.9%',
        latencyOrSize: '640 ms',
        isOurs: true,
      },
    ],
    takeaways: [
      'Entity-anchored graph expansion recovered missing bridge papers in 84% of 2-hop and 3-hop queries.',
      'Post-generation NLI claim checker flags unsupported sentences before returning responses to the user.',
      'Automated RAGAS evaluation suite runs in CI on every prompt or chunking change.',
    ],
  },
  {
    id: 'edgequant-int4',
    title: 'EdgeQuant INT4',
    category: 'Time Series & Edge',
    year: '2025',
    role: 'Model Compression Researcher',
    headlineMetric: '3.6x Smaller',
    headlineContext: '412 MB to 114 MB footprint with < 0.7% accuracy delta',
    summary:
      'Layer-wise sensitivity-aware INT4/INT8 mixed-precision post-training quantization framework tailored for Vision Transformers and edge NPUs without full retraining.',
    problemStatement:
      'Uniform 4-bit quantization severely degrades attention softmax and first/last projection layers in Vision Transformers, making edge deployment unusable without costly QAT.',
    architectureSummary:
      'Computed Hessian-trace sensitivity scores per transformer block on a 256-sample calibration set, keeping top-12% sensitive layers in INT8 while compressing remaining linear projections to group-wise INT4.',
    stack: ['PyTorch', 'CUDA', 'Hessian PTQ', 'Jetson Orin', 'TVM'],
    imageUrl: edgeImage,
    imageAlt:
      'Compact anodized aluminum edge AI neural computing module with precision cooling fins',
    repoPath: 'edgequant-int4',
    benchmarks: [
      {
        model: 'FP16 Reference',
        dataset: 'ImageNet-1K Val',
        primaryMetricLabel: 'Top-1 Acc',
        primaryMetricValue: '81.3%',
        latencyOrSize: '412 MB',
      },
      {
        model: 'Uniform INT4 PTQ',
        dataset: 'ImageNet-1K Val',
        primaryMetricLabel: 'Top-1 Acc',
        primaryMetricValue: '75.8%',
        latencyOrSize: '104 MB',
      },
      {
        model: 'EdgeQuant Mixed (Ours)',
        dataset: 'ImageNet-1K Val',
        primaryMetricLabel: 'Top-1 Acc',
        primaryMetricValue: '80.7%',
        latencyOrSize: '114 MB',
        isOurs: true,
      },
    ],
    takeaways: [
      'Preserving 12% of attention-out projections at INT8 recovered 4.9 percentage points over uniform INT4.',
      'Requires zero labeled fine-tuning data — calibration finishes in under 4 minutes on a single T4 GPU.',
      'Benchmarked end-to-end power draw on Jetson Orin Nano showing 2.1x frames-per-watt gain.',
    ],
  },
  {
    id: 'gridcast-probabilistic',
    title: 'GridCast Conformal',
    category: 'Time Series & Edge',
    year: '2025',
    role: 'Applied ML Engineer',
    headlineMetric: '95.4% Coverage',
    headlineContext: 'Calibrated 72h microgrid load & solar prediction intervals',
    summary:
      'Multi-horizon Temporal Fusion Transformer wrapped with adaptive conformal inference to deliver calibrated uncertainty bounds under seasonal and weather distribution shifts.',
    problemStatement:
      'Point forecasts fail grid operators during sudden cloud-cover transients; uncalibrated quantile neural networks underestimate tail risk when regional weather regimes shift.',
    architectureSummary:
      'Trained a Temporal Fusion Transformer on meteorological covariates and lagged load telemetry, then applied exponentially weighted adaptive conformal calibration over rolling residuals to guarantee empirical coverage.',
    stack: ['PyTorch Forecasting', 'Conformal Prediction', 'Scikit-Learn', 'Weights & Biases'],
    imageUrl: forecastImage,
    imageAlt:
      'Sculptural layered glass waves illustrating calibrated multi-horizon forecasting intervals',
    repoPath: 'gridcast-conformal',
    benchmarks: [
      {
        model: 'XGBoost Quantile',
        dataset: 'Regional Microgrid 3Y',
        primaryMetricLabel: 'CRPS',
        primaryMetricValue: '0.064',
        latencyOrSize: '88.1% cov.',
      },
      {
        model: 'Vanilla TFT Quantile',
        dataset: 'Regional Microgrid 3Y',
        primaryMetricLabel: 'CRPS',
        primaryMetricValue: '0.049',
        latencyOrSize: '90.6% cov.',
      },
      {
        model: 'GridCast Conformal (Ours)',
        dataset: 'Regional Microgrid 3Y',
        primaryMetricLabel: 'CRPS',
        primaryMetricValue: '0.041',
        latencyOrSize: '95.4% cov.',
        isOurs: true,
      },
    ],
    takeaways: [
      'Adaptive rolling conformal update maintained 95% target coverage even across monsoon anomaly months.',
      'Reduced peak reserve over-allocation by 14.2% in simulated microgrid dispatch backtests.',
      'Exposes interactive SHAP feature attribution per forecast horizon for operator auditability.',
    ],
  },
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'paper-int4-calibration',
    title:
      'Adaptive Layer-Wise Sensitivity Calibration for Post-Training INT4 Vision Transformers',
    authors: 'Ch. Thrimurthi, R. Venkatesh, S. Nair',
    venue: 'AI Engineering & Edge Systems Workshop',
    year: '2026',
    track: 'Model Compression & Quantization',
    role: 'First Author',
    keyFinding:
      'Demonstrates that keeping just 12% of high-Hessian-trace attention projections in INT8 recovers +4.9% Top-1 accuracy over uniform INT4 PTQ while cutting model memory by 3.6x.',
    abstract:
      'Deploying Vision Transformers on resource-constrained edge accelerators is bottlenecked by memory bandwidth and non-uniform activation outliers in multi-head self-attention. We propose an unsupervised post-training mixed-precision calibration scheme using diagonal Fisher-Hessian sensitivity approximations over 256 unlabeled samples. Evaluated across DeiT-S, Swin-T, and ViT-B on ImageNet-1K and industrial defect inspection benchmarks, our method achieves within 0.65% of FP16 accuracy at 3.6x compression without retraining.',
    bibtexKey: 'thrimurthi2026adaptive',
    doiOrCode: 'arXiv Preprint · Code & Calibration Scripts Available',
  },
  {
    id: 'paper-citegraph-rrf',
    title:
      'Entity-Anchored Reciprocal Rank Fusion for Verifiable Multi-Hop Scientific Retrieval',
    authors: 'Ch. Thrimurthi, A. Kulkarni',
    venue: 'Undergraduate & Applied AI Research Symposium',
    year: '2026',
    track: 'Retrieval-Augmented Generation & NLP',
    role: 'Lead Author',
    keyFinding:
      'Combines dense BGE retrieval with 2-hop entity graph traversal and NLI entailment gating, cutting unsupported multi-hop LLM claims from 19.4% down to 3.1%.',
    abstract:
      'Dense passage retrieval struggles when answer evidence spans disjoint sections or secondary citations linked only by shared experimental entities. We introduce an entity-anchored retrieval pipeline that fuses lexical BM25, dense semantic embeddings, and lightweight co-occurrence graph walks via Reciprocal Rank Fusion. On a curated 1,200-question multi-hop scientific evaluation set, entity-anchored fusion improves Recall@10 by +11.4 points and reduces unverified citations by 84% relative.',
    bibtexKey: 'thrimurthi2026entity',
    doiOrCode: 'Symposium Proceedings · Evaluation Benchmark Open-Sourced',
  },
  {
    id: 'paper-conformal-microgrid',
    title:
      'Distribution-Free Conformal Prediction Intervals Under Non-Stationary Microgrid Drift',
    authors: 'Ch. Thrimurthi, P. Deshmukh',
    venue: 'Applied ML Technical Monograph Series',
    year: '2025',
    track: 'Probabilistic Time-Series Forecasting',
    role: 'Lead Researcher',
    keyFinding:
      'Validates exponentially weighted conformal residual updates on Temporal Fusion Transformers, sustaining 95.4% empirical coverage across seasonal weather regime shifts.',
    abstract:
      'Deep quantile regressors frequently suffer coverage collapse when deployed on non-stationary energy demand and photovoltaic generation streams. We investigate online adaptive conformal inference coupled with multi-horizon attention architectures across three years of 15-minute microgrid telemetry. Our empirical ablation shows rolling conformal quantile tracking eliminates seasonal under-coverage without sacrificing sharpness, improving Continuous Ranked Probability Score (CRPS) by 16.3%.',
    bibtexKey: 'thrimurthi2025conformal',
    doiOrCode: 'Technical Report · Reproducible Notebooks',
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Core ML & Deep Learning',
    description:
      'End-to-end model formulation, custom loss design, distributed training, and mixed-precision optimization.',
    items: [
      'PyTorch & PyTorch Lightning',
      'Transformers & Vision Backbones',
      'JAX / Flax Prototyping',
      'Scikit-Learn & XGBoost',
      'Loss Engineering & Ablations',
    ],
  },
  {
    title: 'NLP, LLMs & Retrieval',
    description:
      'Grounded generation architectures, parameter-efficient tuning, and automated faithfulness evaluation.',
    items: [
      'LoRA / QLoRA Fine-Tuning',
      'Hybrid BM25 + FAISS Search',
      'Cross-Encoder Reranking',
      'NLI Claim Verification',
      'RAGAS & Evals Harness',
    ],
  },
  {
    title: 'Computer Vision & Edge',
    description:
      'High-resolution inspection pipelines compressed for real-time edge accelerators.',
    items: [
      'Swin, ViT & YOLOv8/v10',
      'Self-Supervised SimCLR',
      'INT4 / INT8 Quantization',
      'ONNX Runtime & TensorRT',
      'OpenCV & Albumentations',
    ],
  },
  {
    title: 'MLOps & Deployment',
    description:
      'Reproducible experiment tracking, containerized inference APIs, and continuous evaluation.',
    items: [
      'FastAPI & Async Serving',
      'Weights & Biases / MLflow',
      'Docker & CUDA Tooling',
      'GitHub Actions CI/CD',
      'PyTest & Dataset Versioning',
    ],
  },
];
