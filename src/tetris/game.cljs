(ns tetris.game
  (:require
   [clojure.core.async :as async]
   [tetris.tetrimoni :as tetrimoni]
   [tetris.visual :as visual]))

;; TODO: Test for x,y
(defn position-validator
  [{:keys [x y]}]
  (and
   (>= x 0)
   (<= x 11)
   (>= y 0)
   (<= y 20)))

(defonce app-state-player
  (atom {:position {:x 0 :y 0}}))

(defonce update-chan (async/chan))

(defn move [direction]
  (async/go
    (async/>! update-chan direction)))

(defn apply-move [move]
  (let [pos (get @app-state-player :position)]
    (swap! app-state-player assoc-in [:position]
           {:x (+ (get move :x) (get pos :x))
             :y (+ (get move :y) (get pos :y))})))

(defn start []
  (async/go
    (while true
      ;; TODO: Fix being called 9x,5x times(?)
      (apply-move (async/<! update-chan)))))
